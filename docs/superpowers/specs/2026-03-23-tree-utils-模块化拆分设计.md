# Tree-Utils 模块化拆分设计

**版本：** 1.0  
**日期：** 2026-03-23  
**状态：** 设计中

## 背景

### 当前问题
- `index.ts` 包含 641 行代码，过长难以维护
- 所有方法实现都堆在一个文件中
- 虽然已创建模块目录（traverse/query/modify/...），但只是 re-export，没有实现拆分

### 目标
- 将 index.ts 拆分为多个职责单一的文件
- 每个方法一个文件，便于维护和测试
- index.ts 只做统一导出
- 保持 API 向后兼容（移除冗余别名）

---

## 设计决策

### 1. 模块结构：扁平化结构 ✅

采用每个方法一个文件的方案：

```
src/
├── index.ts              # 只做统一导出（< 50 行）
├── traverse/
│   ├── foreach.ts       # foreach 实现
│   ├── toArray.ts       # toArray 实现
│   └── index.ts         # re-export
├── query/
│   ├── getLeafNodes.ts
│   ├── findNodeByKey.ts
│   ├── findNodeById.ts
│   ├── findNodeByMatcher.ts
│   ├── nodeExistsInTree.ts
│   ├── findParentOf.ts
│   ├── getNodePath.ts
│   ├── getNodeDepth.ts
│   ├── getNodeBreadcrumb.ts
│   ├── getTreeStats.ts
│   └── index.ts
├── modify/
│   ├── updateKeys.ts
│   ├── updateNodeTitleByKey.ts
│   ├── updateNodeByMatcher.ts
│   ├── moveNodeInTree.ts
│   ├── cloneNode.ts
│   ├── copyNode.ts
│   ├── deleteNode.ts
│   ├── addLeafProperties.ts
│   └── index.ts
├── transform/
│   ├── transformTreeKeys.ts
│   ├── transformTreeNodes.ts
│   ├── searchInTree.ts
│   └── index.ts
├── build/
│   ├── fromArray.ts
│   └── index.ts
└── utils/
    ├── findFirstLeaf.ts
    ├── traverseTreeValues.ts
    ├── filterCheckedLeafKeys.ts
    ├── collectLeafValuesByKey.ts
    ├── convertGroupsToTreeData.ts
    └── index.ts
```

### 2. API 别名：移除冗余别名 ✅

**移除的别名：**
- `findNodeById as findNode` → 只保留 findNodeById
- `nodeExistsInTree as findNodeInTree` → 只保留 nodeExistsInTree
- `collectLeafValuesByKey as findNodeAndCollectLeafValues` → 只保留 collectLeafValuesByKey
- `findParentOf as findTreeNode` → 只保留 findParentOf

**保留的核心方法：** 约 28 个

### 3. 文档策略：单一 README ✅

- 保持一个 README.md 包含所有 API 文档
- 简洁清晰，适合 20-30 个方法

---

## 模块详细设计

### 1. traverse 模块

**职责：** 遍历相关方法

| 文件 | 方法 | 来源 |
|------|------|------|
| foreach.ts | foreach | tree-lodash |
| toArray.ts | toArray | tree-lodash |

**导出：**
```typescript
export { default as foreach } from 'tree-lodash';
export { default as toArray } from 'tree-lodash';
```

---

### 2. query 模块

**职责：** 查询和搜索相关方法

| 文件 | 方法 | 说明 |
|------|------|------|
| getLeafNodes.ts | getLeafNodes | 获取所有叶子节点 |
| findNodeByKey.ts | findNodeByKey | 按 key 查找 |
| findNodeById.ts | findNodeById | 按 id 查找 |
| findNodeByMatcher.ts | findNodeByMatcher | 按匹配器查找 |
| nodeExistsInTree.ts | nodeExistsInTree | 检查节点是否存在 |
| findParentOf.ts | findParentOf | 查找父节点 |
| getNodePath.ts | getNodePath | 获取节点路径 |
| getNodeDepth.ts | getNodeDepth | 获取节点深度 |
| getNodeBreadcrumb.ts | getNodeBreadcrumb | 获取面包屑 |
| getTreeStats.ts | getTreeStats | 获取树统计 |

**特殊方法：** find, some（来自 tree-lodash）
```typescript
export { default as find } from 'tree-lodash';
export { default as some } from 'tree-lodash';
```

---

### 3. modify 模块

**职责：** 节点操作和修改

| 文件 | 方法 | 说明 |
|------|------|------|
| updateKeys.ts | updateKeys | 更新节点 key |
| updateNodeTitleByKey.ts | updateNodeTitleByKey | 按 key 更新标题 |
| updateNodeByMatcher.ts | updateNodeByMatcher | 按匹配器更新 |
| moveNodeInTree.ts | moveNodeInTree | 移动节点 |
| cloneNode.ts | cloneNode | 克隆节点 |
| copyNode.ts | copyNode | 复制节点 |
| deleteNode.ts | deleteNode | 删除节点 |
| addLeafProperties.ts | addLeafProperties | 添加叶子属性 |

---

### 4. transform 模块

**职责：** 树转换和映射

| 文件 | 方法 | 说明 |
|------|------|------|
| transformTreeKeys.ts | transformTreeKeys | 转换键 |
| transformTreeNodes.ts | transformTreeNodes | 转换节点 |
| searchInTree.ts | searchInTree | 搜索树 |

**特殊方法：** map, filter（来自 tree-lodash）
```typescript
export { default as map } from 'tree-lodash';
export { default as filter } from 'tree-lodash';
```

---

### 5. build 模块

**职责：** 从数组构建树

| 文件 | 方法 | 来源 |
|------|------|------|
| fromArray.ts | fromArray | tree-lodash |

```typescript
export { default as fromArray } from 'tree-lodash';
```

---

### 6. utils 模块

**职责：** 工具函数

| 文件 | 方法 | 说明 |
|------|------|------|
| findFirstLeaf.ts | findFirstLeaf | 查找第一个叶子 |
| traverseTreeValues.ts | traverseTreeValues | 遍历树值 |
| filterCheckedLeafKeys.ts | filterCheckedLeafKeys | 过滤选中叶子 |
| collectLeafValuesByKey.ts | collectLeafValuesByKey | 收集叶子值 |
| convertGroupsToTreeData.ts | convertGroupsToTreeData | 分组转树 |

---

## index.ts 设计

### 当前状态（641 行）
- 所有方法实现
- 包含 tree-lodash re-export
- 包含所有别名导出

### 目标状态（< 50 行）
```typescript
// 统一导出入口

// 类型导出
export type {
  TreeNode,
  TreeNodeInfo,
  FindOptions,
  Logger,
  TreeUtilsConfig,
} from "./types";

// 接口导出
export type { PathNode } from "./query/getNodePath";
export type { TreeGroup } from "./utils/convertGroupsToTreeData";

// traverse 模块
export { default as foreach, default } from "./traverse/foreach";
export { default as toArray, default } from "./traverse/toArray";

// query 模块
export { default as find, default } from "./query/find";
export { default as some, default } from "./query/some";
export { getLeafNodes } from "./query/getLeafNodes";
export { findNodeByKey } from "./query/findNodeByKey";
// ... 其他 query 方法

// modify 模块
export { updateKeys } from "./modify/updateKeys";
export { updateNodeTitleByKey } from "./modify/updateNodeTitleByKey";
// ... 其他 modify 方法

// transform 模块
export { default as map, default } from "./transform/map";
export { default as filter, default } from "./transform/filter";
export { transformTreeKeys } from "./transform/transformTreeKeys";
// ... 其他 transform 方法

// build 模块
export { default as fromArray, default } from "./build/fromArray";

// utils 模块
export { findFirstLeaf } from "./utils/findFirstLeaf";
// ... 其他 utils 方法
```

---

## 实施步骤

### Phase 1: 创建文件结构
1. 创建所有方法文件（28 个）
2. 从 index.ts 提取代码到对应文件
3. 创建模块 index.ts（re-export）

### Phase 2: 重构主入口
1. 清空 index.ts
2. 添加统一导出
3. 验证所有导出正确

### Phase 3: 测试验证
1. 运行构建
2. 运行类型检查
3. 运行现有测试
4. 验证 API 兼容性

### Phase 4: 文档更新
1. 更新 README（移除别名文档）
2. 确保示例代码正确

---

## 风险评估

### 低风险
- 完全保留现有功能
- 只是重组代码结构
- 有备份和 Git 历史

### 注意事项
- 确保没有循环依赖
- 验证 tree-lodash 导出正确
- 检查 TypeScript 类型

---

## 成功标准

- [ ] index.ts < 50 行
- [ ] 每个方法一个文件
- [ ] 所有现有功能保留
- [ ] 构建成功
- [ ] 类型检查通过
- [ ] README 文档完整
- [ ] 无循环依赖

---

## 决策总结

| 决策项 | 选择 |
|--------|------|
| 模块结构 | 扁平化（每个方法一个文件） |
| API 别名 | 移除冗余别名 |
| 文档策略 | 单一 README |
| 实施范围 | 仅 tree-utils 包 |
