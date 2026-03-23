# Monorepo 自动化发布方案

## 背景分析

### 当前状态
- ✅ 已配置 `changesets` (.changeset/config.json)
- ✅ 已安装 `bumpp` v9 (交互式版本管理)
- ✅ 已配置 `conventional-changelog-conventionalcommits`
- ✅ 有 CI workflow (仅在 tag push 时触发)
- ❌ `pnpm release` 当前仅调用 `bumpp -r`，未与 changesets 集成
- ❌ 没有实现交互式包选择

### 痛点
1. bumpp 无法与 changesets 协同工作
2. 缺少交互式包选择界面
3. changelog 需要手动管理或依赖 CI 自动生成
4. 无法在本地执行完整的发布流程

## 推荐方案：自定义交互式发布脚本 + Conventional Commits

### 方案概述
放弃 changesets 的手动 changeset 文件创建，改用**自定义脚本**实现：
- ✅ **基于 git commit 自动生成 changelog**（无需 changeset 文件）
- ✅ **交互式选择要发布的包**（使用 inquirer）
- ✅ **自动版本管理和 git 操作**
- ✅ **默认不自动 push**（可控）
- ✅ **极简的开发者工作流**

### 技术选型
- **交互界面**: prompts（更现代的 Node.js 交互库）
- **Changelog 生成**: conventional-changelog-cli（已有）
- **Git 操作**: simple-git

### 实施步骤

#### 步骤 1：安装必要的依赖
```bash
pnpm add -D prompts simple-git
```

#### 步骤 2：创建交互式发布脚本
创建 `scripts/release.ts` 实现以下功能：

**功能模块：**
1. **包选择器** - 使用 prompts 交互式多选要发布的包
2. **变更检测** - 自动检测自上次 tag 后的所有 commit
3. **版本选择** - 交互式提供 patch/minor/major 选项，**默认 patch**
4. **Changelog 生成** - 使用 conventional-changelog-cli
5. **文件更新** - 更新 package.json version 和 CHANGELOG.md
6. **Git 操作** - git add → git commit → git tag（默认不 push）

**脚本核心流程：**
```typescript
// scripts/release.ts 伪代码
async function release() {
  // 1. 检测所有子包
  const packages = await detectPackages();
  
  // 2. 交互式多选包
  const selected = await prompts({
    type: 'multiselect',
    name: 'packages',
    message: '选择要发布的包:',
    choices: packages.map(pkg => ({ title: pkg, value: pkg })),
    hint: '- Space to select, Enter to confirm'
  });
  
  // 3. 为每个选中的包：
  for (const pkg of selected) {
    // 3.1 获取当前版本
    const currentVersion = await getCurrentVersion(pkg);
    
    // 3.2 交互式选择版本类型（默认 patch）
    const versionType = await prompts({
      type: 'select',
      name: 'version',
      message: `选择 ${pkg} 的版本类型 (当前: ${currentVersion}):`,
      choices: [
        { title: 'patch (补丁版本)', value: 'patch' },
        { title: 'minor (次版本)', value: 'minor' },
        { title: 'major (主版本)', value: 'major' }
      ],
      initial: 0  // 默认 patch
    });
    
    // 3.3 计算新版本
    const newVersion = bumpVersion(currentVersion, versionType);
    
    // 3.4 检测变更（git log）
    const commits = await getCommitsSinceLastTag(pkg);
    
    // 3.5 生成 changelog
    const changelog = await generateChangelog(pkg, newVersion, commits);
    
    // 3.6 更新文件
    await updateVersion(pkg, newVersion);
    await updateChangelog(pkg, changelog);
    
    // 3.7 Git 操作（不 push）
    await gitAdd(pkg);
    await gitCommit(pkg, newVersion);
    await gitTag(pkg, newVersion);
  }
  
  // 4. 提示用户手动 push
  console.log('✅ 发布准备完成，请手动验证后执行:');
  console.log('git push --tags && git push');
}
```

**关键交互流程：**
```
$ pnpm release

? 选择要发布的包: (Press <space> to select, <a> to toggle all)
  ❯ ○ array-utils
    ○ color-utils
    ○ crypto-utils
    ○ diff-utils

? 选择 array-utils 的版本类型 (当前: 1.2.3):
    ❯ patch (补丁版本)
      minor (次版本)
      major (主版本)

? 选择 color-utils 的版本类型 (当前: 0.5.0):
    ❯ patch (补丁版本)
      minor (次版本)
      major (主版本)

✅ array-utils: 1.2.3 → 1.2.4
✅ color-utils: 0.5.0 → 0.5.1

✅ 发布准备完成，请手动验证后执行:
git push --tags && git push
```

#### 步骤 3：更新 package.json scripts
```json
{
  "scripts": {
    "release": "tsx scripts/release.ts"
  }
}
```

#### 步骤 4：配置常规提交规范
创建 `.commitlintrc.json`：
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "scope-enum": [2, "always", ["array-utils", "color-utils", ...]]
  }
}
```

#### 步骤 5：测试验证
```bash
# 测试交互式界面
pnpm release

# 验证生成的文件
git diff
cat packages/array-utils/CHANGELOG.md
git tag -l
```

#### 步骤 6：启用自动 push（可选）
当测试通过后，修改脚本添加 push 功能：
```typescript
// 在 gitTag() 后添加
if (process.env.AUTO_PUSH === 'true') {
  await gitPush();
  await gitPushTags();
}
```

## 替代方案对比

### 方案 A：自定义脚本 + Conventional Commits（✅ 当前推荐）
**优点：**
- 完全控制发布流程
- 极简工作流，无需 changeset 文件
- 基于 git commit 自动生成 changelog
- 交互式包选择
- 默认不自动 push（安全）

**缺点：**
- 需要开发自定义脚本
- 需要维护脚本代码

**适合场景：** ✅ 当前需求完全匹配

### 方案 B：Pure Changesets
**优点：**
- 官方支持 pnpm monorepos
- 成熟稳定，社区活跃
- 自动 changelog 生成
- PR/MR 自动管理
- CI 集成完善

**缺点：**
- ❌ 需要为每个变更创建 changeset 文件（增加开发者负担）
- ❌ changelog 依赖 conventional commits

**适合场景：** 团队愿意维护 changeset 工作流

### 方案 C：Release-please
**优点：**
- Google 官方维护
- 完全自动化，无需手动创建 changeset
- 与 GitHub Releases 深度集成

**缺点：**
- ❌ 对 monorepo 支持不如 changesets
- ❌ 版本管理不够灵活
- ❌ 无法交互式选择包
- ❌ 自动 push，可能不够安全

**适合场景：** GitHub Releases 为主要发布渠道

### 方案 D：bumpp + Conventional Changelog
**优点：**
- 使用现有的 bumpp
- 简单直接

**缺点：**
- ❌ 不支持 monorepo（只能发布整个 repo）
- ❌ 无 changeset 管理机制
- ❌ changelog 需要手动合并

**适合场景：** 单包项目

## Changelog 生成机制

### Conventional Commits 规范
```
<type>(<scope>): <subject>

# 示例
feat(array-utils): add groupBy function
fix(color-utils): resolve hex alpha parsing issue
docs(string-utils): update README
```

### Changesets Changelog 格式
```markdown
## 1.2.0

### Major Changes

- `abc123` Thanks @author! - feat(core): breaking change description

### Minor Changes

- `def456` - feat(ui): new component

### Patch Changes

- `ghi789` - fix(bug): resolved issue
```

## 实施检查清单

- [ ] 安装必要的 npm 依赖（inquirer, simple-git 等）
- [ ] 创建 `scripts/release.ts` 交互式发布脚本
- [ ] 配置 commitlint 规范
- [ ] 测试交互式包选择功能
- [ ] 验证 changelog 自动生成
- [ ] 验证版本管理和 git tag
- [ ] 测试完整发布流程（不 push）
- [ ] （可选）启用自动 push 功能
- [ ] 编写团队使用文档

## 详细实施步骤（TODO）

### TODO 1：安装依赖
```bash
pnpm add -D inquirer simple-git conventional-changelog conventional-recommended-bump
```

### TODO 2：创建发布脚本
创建 `scripts/release.ts`，实现：
1. 检测所有子包
2. 交互式选择要发布的包
3. 检测 git commit
4. 计算新版本
5. 生成 changelog
6. 更新文件
7. 执行 git 操作（不 push）

### TODO 3：配置 commitlint
创建 `.commitlintrc.json`，确保 commit 符合规范

### TODO 4：测试验证
1. 运行 `pnpm release`
2. 选择包并完成发布
3. 验证 changelog、version、tag
4. 确认无误后手动 push

### TODO 5：启用自动 push（可选）
测试通过后添加 push 功能

## 关键配置文件

### package.json (scripts 部分)
```json
{
  "scripts": {
    "release": "tsx scripts/release.ts"
  }
}
```

### scripts/release.ts (核心脚本)
脚本将实现完整的发布流程：
1. 读取 `pnpm-workspace.yaml` 获取所有包
2. 使用 inquirer 交互式选择
3. 使用 conventional-changelog 生成 changelog
4. 使用 simple-git 执行 git 操作

## 团队工作流

### 简化版发布流程（当前目标）✅

**核心原则：基于 git commit 自动生成 changelog，无需手动管理 changeset**

#### 开发者日常使用（极简）
1. 修改代码并提交（使用 conventional commits）
2. 运行 `pnpm release` 交互式选择要发布的包
3. 自动完成剩余所有步骤

#### 完整发布流程
1. **交互式选择** → `pnpm release` 启动交互界面，选择要发布的包
2. **版本管理** → 自动计算版本号（基于 commit 类型）
3. **生成 changelog** → 根据 git commit history 自动生成
4. **更新文件** → 更新 version、CHANGELOG.md 等
5. **Git 操作** → git add → git commit → git tag（**默认不 push**）
6. **可选 push** → 测试通过后启用 `git push` 功能

#### 测试阶段（当前）
```bash
# 仅执行到 git tag，不 push
pnpm release

# 验证生成的 changelog 和 tag
git log --oneline -10
cat packages/xxx/CHANGELOG.md
```

#### 生产阶段（启用 push）
```bash
# 添加到 ~/.bashrc 或项目 .zshrc
export AUTO_PUSH=true

# 完整发布
pnpm release
```
