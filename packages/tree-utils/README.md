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

#### getNodePath

获取节点路径。

```typescript
import { getNodePath } from '@zid-utils/tree-utils';

const path = getNodePath(tree, '1-2', 'key', 'children');
```

#### getNodeBreadcrumb

获取面包屑路径。

```typescript
import { getNodeBreadcrumb } from '@zid-utils/tree-utils';

const breadcrumb = getNodeBreadcrumb(tree, '1-2');
```

#### getTreeStats

获取树统计信息。

```typescript
import { getTreeStats } from '@zid-utils/tree-utils';

const stats = getTreeStats(tree);
// { totalNodes: 3, maxDepth: 1, leafCount: 2 }
```

### 节点操作

#### updateNodeTitleByKey

根据 key 更新节点标题。

```typescript
import { updateNodeTitleByKey } from '@zid-utils/tree-utils';

updateNodeTitleByKey(tree, '1-1', 'New Title');
```

#### moveNodeInTree

在树中移动节点。

```typescript
import { moveNodeInTree } from '@zid-utils/tree-utils';

moveNodeInTree(tree, 'source-key', 'target-key');
```

#### deleteNode

删除节点。

```typescript
import { deleteNode } from '@zid-utils/tree-utils';

const newTree = deleteNode(tree, 'key-to-delete');
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

### 工具函数

#### findFirstLeaf

查找第一个叶子节点。

```typescript
import { findFirstLeaf } from '@zid-utils/tree-utils';

const leaf = findFirstLeaf(tree);
```

#### filterCheckedLeafKeys

过滤选中的叶子节点 key。

```typescript
import { filterCheckedLeafKeys } from '@zid-utils/tree-utils';

const keys = filterCheckedLeafKeys(tree);
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
  node: T;
  depth: number;
  index: number;
  parent: PathNode<T> | null;
  path: string;
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

## License

MIT
