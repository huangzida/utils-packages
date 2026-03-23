# @zid-utils/tree-utils

> 树形数据结构处理工具库 (Tree data structure utility library)

## 安装

```bash
pnpm add @zid-utils/tree-utils
```

## 核心方法（来自 tree-lodash）

本包使用 [tree-lodash](https://github.com/zhangshichun/tree-lodash) 作为核心实现，提供强大的树操作功能。

### foreach - 遍历

遍历树或森林的所有节点。

```typescript
import { foreach } from '@zid-utils/tree-utils';

const tree = {
  key: '1',
  title: 'Root',
  children: [
    { key: '1-1', title: 'Child 1' },
    { key: '1-2', title: 'Child 2' }
  ]
};

foreach(tree, (node, meta) => {
  console.log(`${'  '.repeat(meta.depth)}${node.title}`);
}, { strategy: 'pre' });
```

### map - 映射

遍历并映射每个节点，返回新的树结构。

```typescript
import { map } from '@zid-utils/tree-utils';

const newTree = map(tree, (node) => ({
  ...node,
  title: `Mapped: ${node.title}`
}));
```

### filter - 过滤

过滤树节点，保留符合条件的节点。

```typescript
import { filter } from '@zid-utils/tree-utils';

const filteredTree = filter(tree, (node) => node.key.startsWith('1-'));
```

### find - 查找

查找第一个匹配的节点。

```typescript
import { find } from '@zid-utils/tree-utils';

const node = find(tree, (node) => node.key === '1-1');
```

### some - 存在检查

检查是否存在匹配的节点。

```typescript
import { some } from '@zid-utils/tree-utils';

const exists = some(tree, (node) => node.key === '1-1');
```

### toArray - 扁平化

将树结构扁平化为数组。

```typescript
import { toArray } from '@zid-utils/tree-utils';

const nodes = toArray(tree);
```

### fromArray - 构建树

从扁平数组构建树结构。

```typescript
import { fromArray } from '@zid-utils/tree-utils';

const array = [
  { id: 1, pid: null, title: 'Root' },
  { id: 2, pid: 1, title: 'Child' }
];

const tree = fromArray(array, {
  parentKey: 'pid',
  itemKey: 'id',
  childrenKey: 'children'
});
```

## 扩展方法

### 节点查询

#### getLeafNodes

获取所有叶子节点。

```typescript
import { getLeafNodes } from '@zid-utils/tree-utils';

const leafNodes = getLeafNodes(tree, 'isLeaf');
```

#### findNodeByKey

根据 key 查找节点。

```typescript
import { findNodeByKey } from '@zid-utils/tree-utils';

const node = findNodeByKey(tree, '1-1');
```

#### findNodeById

根据 id 查找节点。

```typescript
import { findNodeById } from '@zid-utils/tree-utils';

const node = findNodeById(tree, 'node-id');
```

#### findNodeByMatcher

根据匹配器查找节点。

```typescript
import { findNodeByMatcher } from '@zid-utils/tree-utils';

const node = findNodeByMatcher(tree, (n) => n.title === 'Target');
```

#### nodeExistsInTree

检查节点是否存在于树中。

```typescript
import { nodeExistsInTree } from '@zid-utils/tree-utils';

const exists = nodeExistsInTree(tree, 'node-title');
```

#### findParentOf

查找节点的父节点。

```typescript
import { findParentOf } from '@zid-utils/tree-utils';

const parent = findParentOf(tree, 'child-key');
```

#### getNodePath

获取节点路径。

```typescript
import { getNodePath, type PathNode } from '@zid-utils/tree-utils';

const path = getNodePath(tree, '1-2', 'key', 'children');
// 返回 PathNode[] 包含路径信息
```

#### getNodeDepth

获取节点深度。

```typescript
import { getNodeDepth } from '@zid-utils/tree-utils';

const depth = getNodeDepth(tree, '1-2-1');
// 返回节点所在层级（根节点为0）
```

#### getNodeBreadcrumb

获取面包屑路径（所有祖先节点）。

```typescript
import { getNodeBreadcrumb } from '@zid-utils/tree-utils';

const breadcrumb = getNodeBreadcrumb(tree, '1-2-1');
// 返回从根到目标的所有节点
```

#### getTreeStats

获取树统计信息。

```typescript
import { getTreeStats } from '@zid-utils/tree-utils';

const stats = getTreeStats(tree);
// { totalNodes: 10, maxDepth: 3, leafCount: 5 }
```

### 节点操作

#### updateKeys

更新节点的 key。

```typescript
import { updateKeys } from '@zid-utils/tree-utils';

updateKeys(sourceNode, targetNode);
```

#### updateNodeTitleByKey

根据 key 更新节点标题。

```typescript
import { updateNodeTitleByKey } from '@zid-utils/tree-utils';

updateNodeTitleByKey(tree, '1-1', 'New Title');
```

#### updateNodeByMatcher

根据匹配器更新节点。

```typescript
import { updateNodeByMatcher } from '@zid-utils/tree-utils';

const newTree = updateNodeByMatcher(
  tree,
  (node) => node.key === 'target',
  (node) => ({ ...node, title: 'Updated' })
);
```

#### moveNodeInTree

在树中移动节点。

```typescript
import { moveNodeInTree } from '@zid-utils/tree-utils';

moveNodeInTree(tree, 'source-key', 'target-key');
```

#### cloneNode

克隆节点。

```typescript
import { cloneNode } from '@zid-utils/tree-utils';

cloneNode(sourceNode, targetNode);
```

#### copyNode

复制节点（带副本标识）。

```typescript
import { copyNode } from '@zid-utils/tree-utils';

const newTree = copyNode(tree, 'source-key', 'target-key');
```

#### deleteNode

删除节点。

```typescript
import { deleteNode } from '@zid-utils/tree-utils';

const newTree = deleteNode(tree, 'key-to-delete');
```

#### addLeafProperties

为节点添加叶子属性。

```typescript
import { addLeafProperties } from '@zid-utils/tree-utils';

const newTree = addLeafProperties(tree);
// 自动设置 isLeaf 和 disabled 属性
```

### 树转换

#### transformTreeKeys

转换树节点的键。

```typescript
import { transformTreeKeys } from '@zid-utils/tree-utils';

const newTree = transformTreeKeys(tree, {
  title: 'label',
  key: 'id'
});
```

#### transformTreeNodes

转换树节点数据。

```typescript
import { transformTreeNodes } from '@zid-utils/tree-utils';

const newTree = transformTreeNodes(tree, (node) => ({
  ...node,
  isActive: true
}));
```

#### searchInTree

在树中搜索节点。

```typescript
import { searchInTree } from '@zid-utils/tree-utils';

const results = searchInTree(tree, 'search-term');
```

### 工具函数

#### findFirstLeaf

查找第一个叶子节点。

```typescript
import { findFirstLeaf } from '@zid-utils/tree-utils';

const leaf = findFirstLeaf(tree);
```

#### traverseTreeValues

遍历树中特定键的值。

```typescript
import { traverseTreeValues } from '@zid-utils/tree-utils';

const values = traverseTreeValues(tree, 'title');
```

#### filterCheckedLeafKeys

过滤选中的叶子节点 key。

```typescript
import { filterCheckedLeafKeys } from '@zid-utils/tree-utils';

const keys = filterCheckedLeafKeys(tree);
```

#### collectLeafValuesByKey

收集叶子节点的值。

```typescript
import { collectLeafValuesByKey } from '@zid-utils/tree-utils';

const values = collectLeafValuesByKey(tree, 'parent-value');
```

#### convertGroupsToTreeData

将分组数据转换为树形结构。

```typescript
import { convertGroupsToTreeData, type TreeGroup } from '@zid-utils/tree-utils';

const tree = convertGroupsToTreeData(items, 'category');
// 返回 TreeGroup[] 类型
```

## KeyPath 路径操作

基于 key 层级路径的查询和操作函数。

### findByKeyPath

根据 key 层级路径查找节点。

```typescript
import { findByKeyPath } from '@zid-utils/tree-utils';

const tree = [{
  key: 'user',
  children: [{
    key: 'profile',
    children: [{ key: 'address' }]
  }]
}];

const node = findByKeyPath(tree, 'user.profile.address');
// node = { key: 'address', ... }
```

### hasKeyPath

检查路径是否存在。

```typescript
import { hasKeyPath } from '@zid-utils/tree-utils';

const exists = hasKeyPath(tree, 'user.profile');
// true
```

### autoGenerateKeyPath

自动为每个节点生成 keyPath 属性。

```typescript
import { autoGenerateKeyPath } from '@zid-utils/tree-utils';

const result = autoGenerateKeyPath(tree);
// result = [
//   { key: 'a', keyPath: 'a', children: [...] },
//   { key: 'a.b', keyPath: 'a.b', ... }
// ]
```

### buildKeyPathMap

构建 keyPath 到节点的 Map（用于 O(1) 查询）。

```typescript
import { autoGenerateKeyPath, buildKeyPathMap } from '@zid-utils/tree-utils';

const treeWithPath = autoGenerateKeyPath(tree);
const map = buildKeyPathMap(treeWithPath);

const node = map.get('user.profile.address'); // O(1)
```

### getKeyPathParts

解析路径为数组。

```typescript
import { getKeyPathParts } from '@zid-utils/tree-utils';

const parts = getKeyPathParts('a.b.c'); // ['a', 'b', 'c']
const parts = getKeyPathParts('a>b>c', '>'); // ['a', 'b', 'c']
```

### joinKeyPath

拼接路径片段。

```typescript
import { joinKeyPath } from '@zid-utils/tree-utils';

const path = joinKeyPath(['a', 'b', 'c']); // 'a.b.c'
const path = joinKeyPath(['a', 'b'], '/'); // 'a/b'
```

### getParentKeyPath

获取父路径。

```typescript
import { getParentKeyPath } from '@zid-utils/tree-utils';

const parent = getParentKeyPath('a.b.c'); // 'a.b'
const parent = getParentKeyPath('a'); // null
```

### getKeyPathDepth

获取路径深度。

```typescript
import { getKeyPathDepth } from '@zid-utils/tree-utils';

const depth = getKeyPathDepth('a.b.c'); // 3
```

### 配置选项

所有 KeyPath 函数支持以下配置选项：

```typescript
interface KeyPathOptions {
  separator?: string;   // 路径分隔符，默认 '.'
  keyKey?: string;     // key 属性名，默认 'key'
  childrenKey?: string; // children 属性名，默认 'children'
  keyPathKey?: string;  // 生成的 keyPath 属性名，默认 'keyPath'
}
```

## 类型定义

### TreeNode

```typescript
interface TreeNode {
  key?: string | number;
  title?: string | number;
  children?: TreeNode[];
  isLeaf?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  checked?: boolean;
  [key: string]: any;
}
```

### PathNode

```typescript
interface PathNode<T> {
  node: T;           // 节点数据
  depth: number;      // 深度（根节点为0）
  index: number;      // 在兄弟节点中的索引
  parent: PathNode<T> | null;  // 父节点
  path: string;       // 路径字符串，如 'root/child/grandchild'
}
```

### TreeGroup

```typescript
interface TreeGroup {
  label: string;
  value: string | number;
  children?: any[];
}
```

## 遍历策略

所有核心方法都支持三种遍历策略：

- `pre` - 前序遍历（默认）
- `post` - 后序遍历
- `breadth` - 广度优先遍历

```typescript
import { foreach } from '@zid-utils/tree-utils';

foreach(tree, callback, { strategy: 'breadth' });
```

## 相关库推荐

### 文件系统场景
- [@httpx/treeu](https://github.com/belgattitude/httpx/tree/main/packages/treeu) - 轻量级 DFS 搜索和路径映射，适合深层嵌套树的性能优化

### 其他选择
- [tree-model](https://github.com/joaonuno/tree-model) - 模型驱动的树操作
- [js-tree](https://github.com/guigrpa/js-tree) - React 集成友好的树组件

## License

MIT
