# Tree-Utils 重构和迁移设计方案

## 1. 背景

### 1.1 项目现状
- **tree-lodash**: 成熟的 npm 包，提供 7 个树操作方法，支持多种遍历策略
- **tree-utils**: utils-packages monorepo 中的树操作包，包含 28+ 个方法
- **问题**: tree-utils/index.ts 过大（905行），存在重复功能，README 不存在

### 1.2 目标
- 使用 tree-lodash 作为核心实现，避免重复代码
- 清理重复功能，统一 API
- 拆分文件，提升可维护性
- 创建完整的 README 文档

## 2. 设计方案

### 2.1 集成策略

#### 安装依赖
```bash
cd packages/tree-utils
pnpm add tree-lodash
```

#### Re-export tree-lodash 方法
直接导出 tree-lodash 的所有方法，确保 API 统一：
```typescript
export { default as foreach, foreach } from 'tree-lodash';
export { default as map, map } from 'tree-lodash';
export { default as filter, filter } from 'tree-lodash';
export { default as find, find } from 'tree-lodash';
export { default as some, some } from 'tree-lodash';
export { default as toArray, toArray } from 'tree-lodash';
export { default as fromArray, fromArray } from 'tree-lodash';
```

### 2.2 保留的方法

tree-utils 中独有的方法（不在 tree-lodash 中）：

#### 查询类
- `getLeafNodes` - 获取所有叶子节点
- `findNodeByKey` - 按 key 查找节点
- `findNodeById` - 按 id 查找节点
- `findNodeByMatcher` - 按匹配器查找节点
- `nodeExistsInTree` - 检查节点是否存在
- `findParentOf` - 查找父节点
- `getNodePath` - 获取节点路径
- `getNodeDepth` - 获取节点深度
- `getNodeBreadcrumb` - 获取面包屑路径
- `getTreeStats` - 获取树统计信息

#### 操作类
- `updateKeys` - 更新节点 key
- `updateNodeTitleByKey` - 按 key 更新标题
- `updateNodeByMatcher` - 按匹配器更新节点
- `moveNodeInTree` - 移动节点
- `cloneNode` - 克隆节点
- `copyNode` - 复制节点
- `deleteNode` - 删除节点
- `addLeafProperties` - 添加叶子属性

#### 转换类
- `transformTreeKeys` - 转换树键
- `transformTreeNodes` - 转换树节点
- `searchInTree` - 搜索树节点
- `flattenTree` - 扁平化树（保留，别名 toArray）

#### 工具类
- `findFirstLeaf` - 查找第一个叶子
- `traverseTreeValues` - 遍历树值
- `filterCheckedLeafKeys` - 过滤选中的叶子
- `collectLeafValuesByKey` - 收集叶子值
- `convertGroupsToTreeData` - 分组转树

### 2.3 移除的重复方法

以下方法与 tree-lodash 功能重复，直接移除：

1. `flattenTree` → 使用 `toArray`（功能完全相同）
2. `mapTree` → 使用 `map`（功能相同，tree-lodash 更强大）
3. `filterTreeNodes` → 使用 `filter`（功能相同，tree-lodash 更强大）

### 2.4 类型定义

保留现有的类型定义文件，向后兼容：
```typescript
// src/types.ts
export interface TreeNode {
  key?: string | number;
  title?: string | number;
  children?: TreeNode[];
  isLeaf?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  checked?: boolean;
  [key: string]: any;
}

// 导出 tree-lodash 的类型
export type { Tree, TreeKey, ChildrenKey, Strategy } from 'tree-lodash';
```

### 2.5 文件结构

```
tree-utils/src/
├── index.ts              # 主入口，re-export 所有方法
├── types.ts              # 类型定义
├── traverse/             # 遍历相关
│   ├── index.ts
│   ├── foreach.ts        # from tree-lodash
│   └── toArray.ts        # from tree-lodash
├── transform/            # 转换相关
│   ├── index.ts
│   ├── map.ts            # from tree-lodash
│   ├── filter.ts         # from tree-lodash
│   └── search.ts         # 现有方法
├── query/                # 查询相关
│   ├── index.ts
│   ├── find.ts           # from tree-lodash
│   ├── some.ts           # from tree-lodash
│   └── query.ts          # 现有查询方法
├── build/                # 构建相关
│   ├── index.ts
│   └── fromArray.ts      # from tree-lodash
├── modify/               # 修改相关
│   ├── index.ts
│   ├── update.ts         # 现有更新方法
│   ├── move.ts           # 现有移动方法
│   └── delete.ts         # 现有删除方法
└── utils/                # 工具类
    ├── index.ts
    └── helpers.ts        # 辅助函数
```

### 2.6 README 文档结构

```markdown
# @zid-utils/tree-utils

> 树形数据结构处理工具库

## 安装

```bash
pnpm add @zid-utils/tree-utils
```

## 核心方法（来自 tree-lodash）

### foreach - 遍历
### map - 映射
### filter - 过滤
### find - 查找
### some - 存在检查
### toArray - 扁平化
### fromArray - 构建树

## 扩展方法

### 节点查询
### 节点操作
### 树转换
### 工具函数

## 类型定义

## 示例

## License
```

## 3. 实施计划

### 阶段 1: 依赖安装和基础集成
- [ ] 安装 tree-lodash 依赖
- [ ] 创建 types.ts 类型定义
- [ ] 创建基础文件结构

### 阶段 2: 方法迁移和清理
- [ ] Re-export tree-lodash 方法
- [ ] 迁移现有独有方法到对应模块
- [ ] 移除重复方法
- [ ] 更新 index.ts 主入口

### 阶段 3: 文档完善
- [ ] 创建完整的 README.md
- [ ] 添加使用示例
- [ ] 验证 API 导出

### 阶段 4: 测试验证
- [ ] 运行现有测试
- [ ] 验证 API 兼容性
- [ ] 检查类型导出

## 4. 风险评估

### 低风险
- 直接使用成熟的 tree-lodash 实现
- 保留所有独有功能
- 向后兼容的类型定义

### 注意事项
- 确保 tree-lodash 版本稳定后再集成
- 测试所有现有功能不被破坏
- 验证 bundle 大小变化

## 5. 成功标准

- ✅ tree-lodash 的 7 个方法全部可用
- ✅ 现有独有方法全部保留
- ✅ 重复方法已移除
- ✅ 文件已拆分，可维护性提升
- ✅ README 文档完整
- ✅ 所有测试通过
