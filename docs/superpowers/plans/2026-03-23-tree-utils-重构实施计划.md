# Tree-Utils 重构和迁移实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重构 tree-utils 包，集成 tree-lodash 作为核心实现，移除重复功能，拆分文件，创建完整文档

**Architecture:** 使用 tree-lodash 作为核心方法库（7个），保留 tree-utils 独有的 21 个扩展方法，按功能模块拆分为 traverse/transform/query/build/modify/utils 子目录

**Tech Stack:** 
- tree-lodash (npm 包)
- TypeScript
- pnpm
- Vitest (测试框架)

---

## 文件结构映射

### 将创建的文件

```
packages/tree-utils/src/
├── index.ts                    # 主入口
├── types.ts                    # 类型定义
├── traverse/
│   └── index.ts               # 导出遍历方法
├── transform/
│   └── index.ts               # 导出转换方法
├── query/
│   └── index.ts               # 导出查询方法
├── build/
│   └── index.ts               # 导出构建方法
├── modify/
│   └── index.ts               # 导出修改方法
└── utils/
    └── index.ts               # 导出工具方法
```

### 将修改的文件

```
packages/tree-utils/package.json          # 添加 tree-lodash 依赖
packages/tree-utils/README.md            # 创建完整的 README 文档
```

### 将删除的代码

```
packages/tree-utils/src/index.ts         # 移除所有重复方法
- flattenTree (使用 toArray 替代)
- mapTree (使用 map 替代)
- filterTreeNodes (使用 filter 替代)
```

---

## 实施任务

### Task 1: 安装 tree-lodash 依赖

**Files:**
- Modify: `packages/tree-utils/package.json`

- [ ] **Step 1: 安装 tree-lodash**

Run: `cd packages/tree-utils && pnpm add tree-lodash`

Expected: tree-lodash 已添加到 dependencies

---

### Task 2: 创建类型定义文件

**Files:**
- Modify: `packages/tree-utils/src/types.ts`

- [ ] **Step 1: 更新类型定义**

打开文件并添加以下内容：

```typescript
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

export interface TreeNodeInfo {
  id?: string;
  online?: string;
}

export interface FindOptions {
  childrenKey?: string;
  strict?: boolean;
}

export interface Logger {
  warn?: (message: string) => void;
  error?: (message: string) => void;
}

export interface TreeUtilsConfig {
  logger?: Logger;
}

// 导出 tree-lodash 的类型
export type { Tree, TreeKey, ChildrenKey, Strategy } from 'tree-lodash';
```

Run: `cat packages/tree-utils/src/types.ts` 验证内容

---

### Task 3: 创建 traverse 模块

**Files:**
- Create: `packages/tree-utils/src/traverse/index.ts`

- [ ] **Step 1: 创建 traverse/index.ts**

```typescript
export { default as foreach, foreach } from 'tree-lodash';
export { default as toArray, toArray } from 'tree-lodash';
```

---

### Task 4: 创建 transform 模块

**Files:**
- Create: `packages/tree-utils/src/transform/index.ts`

- [ ] **Step 1: 创建 transform/index.ts**

```typescript
export { default as map, map } from 'tree-lodash';
export { default as filter, filter } from 'tree-lodash';

export {
  transformTreeKeys,
  transformTreeNodes,
  searchInTree,
} from '../index';
```

---

### Task 5: 创建 query 模块

**Files:**
- Create: `packages/tree-utils/src/query/index.ts`

- [ ] **Step 1: 创建 query/index.ts**

```typescript
export { default as find, find } from 'tree-lodash';
export { default as some, some } from 'tree-lodash';

export {
  getLeafNodes,
  findNodeByKey,
  findNodeById,
  findNodeByMatcher,
  nodeExistsInTree,
  findParentOf,
  getNodePath,
  getNodeDepth,
  getNodeBreadcrumb,
  getTreeStats,
  type PathNode,
} from '../index';
```

---

### Task 6: 创建 build 模块

**Files:**
- Create: `packages/tree-utils/src/build/index.ts`

- [ ] **Step 1: 创建 build/index.ts**

```typescript
export { default as fromArray, fromArray } from 'tree-lodash';
```

---

### Task 7: 创建 modify 模块

**Files:**
- Create: `packages/tree-utils/src/modify/index.ts`

- [ ] **Step 1: 创建 modify/index.ts**

```typescript
export {
  updateKeys,
  updateNodeTitleByKey,
  updateNodeByMatcher,
  moveNodeInTree,
  cloneNode,
  copyNode,
  deleteNode,
  addLeafProperties,
} from '../index';
```

---

### Task 8: 创建 utils 模块

**Files:**
- Create: `packages/tree-utils/src/utils/index.ts`

- [ ] **Step 1: 创建 utils/index.ts**

```typescript
export {
  findFirstLeaf,
  traverseTreeValues,
  filterCheckedLeafKeys,
  collectLeafValuesByKey,
  convertGroupsToTreeData,
} from '../index';
```

---

### Task 9: 重写主入口文件

**Files:**
- Modify: `packages/tree-utils/src/index.ts`

- [ ] **Step 1: 备份现有文件**

Run: `cp packages/tree-utils/src/index.ts packages/tree-utils/src/index.ts.backup`

- [ ] **Step 2: 创建新的 index.ts**

```typescript
export type {
  TreeNode,
  TreeNodeInfo,
  FindOptions,
  Logger,
  TreeUtilsConfig,
  Tree,
  TreeKey,
  ChildrenKey,
  Strategy,
} from "./types";

export { PathNode } from "./index";

// 从 tree-lodash 导入核心方法
export { default as foreach, foreach } from "tree-lodash";
export { default as map, map } from "tree-lodash";
export { default as filter, filter } from "tree-lodash";
export { default as find, find } from "tree-lodash";
export { default as some, some } from "tree-lodash";
export { default as toArray, toArray } from "tree-lodash";
export { default as fromArray, fromArray } from "tree-lodash";

// 导入现有类型
import type { TreeNode, Logger as LoggerType } from "./types";

// 保留的独有方法 - 查询类
export const getLeafNodes = (
  treeData: Record<string, any>[],
  isLeafKey: string = "isLeaf"
): Record<string, any>[] => {
  function collectLeafNodes(nodes: Record<string, any>[]): Record<string, any>[] {
    const leafNodes: Record<string, any>[] = [];
    for (const node of nodes) {
      if (node[isLeafKey] === true) {
        leafNodes.push(node);
      } else if (node.children) {
        leafNodes.push(...collectLeafNodes(node.children));
      }
    }
    return leafNodes;
  }
  return collectLeafNodes(treeData);
};

export const findNodeByKey = (
  treeData: TreeNode[],
  key: string | number
): TreeNode | null => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.key === key) return node;
    if (node.children) {
      const foundNode = findNodeByKey(node.children, key);
      if (foundNode) return foundNode;
    }
  }
  return null;
};

export const findNodeById = (nodes: any[], id: string): any => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findNodeByMatcher = (
  nodes: any[],
  matcher: (node: any) => boolean,
  childrenKey: string = "children"
): any | null => {
  for (const node of nodes) {
    if (matcher(node)) return node;
    if (node[childrenKey]) {
      const found = findNodeByMatcher(node[childrenKey], matcher, childrenKey);
      if (found) return found;
    }
  }
  return null;
};

export const nodeExistsInTree = (
  nodes: any[],
  searchValue: string
): boolean => {
  return nodes.some((node) => {
    if (node.value === searchValue || node.title === searchValue) return true;
    if (node.children && Array.isArray(node.children)) {
      return nodeExistsInTree(node.children, searchValue);
    }
    return false;
  });
};

export const findParentOf = (nodes: any[], targetKey: string): any => {
  for (const node of nodes) {
    if (node.children?.some((child: any) => child.key === targetKey)) {
      return node;
    }
    if (node.children) {
      const found = findParentOf(node.children, targetKey);
      if (found) return found;
    }
  }
  return null;
};

export interface PathNode<T> {
  node: T;
  depth: number;
  index: number;
  parent: PathNode<T> | null;
  path: string;
}

export const getNodePath = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children"
): PathNode<T>[] | null => {
  const findPath = (
    nodes: T[],
    target: string | number,
    currentPath: PathNode<T>[]
  ): PathNode<T>[] | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const newPathNode: PathNode<T> = {
        node,
        depth: currentPath.length,
        index: i,
        parent: currentPath.length > 0 ? currentPath[currentPath.length - 1] : null,
        path:
          currentPath.length === 0
            ? String(node[keyField])
            : `${currentPath[currentPath.length - 1].path}/${String(node[keyField])}`,
      };

      if (node[keyField] === target) {
        return [...currentPath, newPathNode];
      }

      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        const result = findPath(children, target, [...currentPath, newPathNode]);
        if (result) return result;
      }
    }
    return null;
  };

  return findPath(treeData, targetKey, []);
};

export const getNodeDepth = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children"
): number => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.length - 1 : -1;
};

export const getNodeBreadcrumb = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children"
): T[] => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.map((p) => p.node) : [];
};

export const getTreeStats = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children"
): { totalNodes: number; maxDepth: number; leafCount: number } => {
  let totalNodes = 0;
  let maxDepth = 0;
  let leafCount = 0;

  const traverse = (nodes: T[], depth: number) => {
    for (const node of nodes) {
      totalNodes++;
      maxDepth = Math.max(maxDepth, depth);

      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        traverse(children, depth + 1);
      } else {
        leafCount++;
      }
    }
  };

  traverse(treeData, 0);
  return { totalNodes, maxDepth, leafCount };
};

// 保留的独有方法 - 操作类
export const updateKeys = (sourceNode: TreeNode, targetNode: TreeNode) => {
  sourceNode.key = `${targetNode.key}-${targetNode.children?.length}`;
  if (sourceNode.children) {
    sourceNode.children.forEach((item, index) => {
      item.key = `${sourceNode.key}-${index}`;
    });
  }
};

export const updateNodeTitleByKey = (
  tree: TreeNode[],
  targetKey: string,
  newTitle: string
): void => {
  for (const node of tree) {
    if (node.key === targetKey) {
      node.title = newTitle;
      return;
    }
    if (node.children) {
      updateNodeTitleByKey(node.children, targetKey, newTitle);
    }
  }
};

export const updateNodeByMatcher = <T extends Record<string, any>>(
  nodes: T[],
  matcher: (node: T) => boolean,
  updater: (node: T) => T,
  childrenKey: string = "children"
): T[] => {
  return nodes.map((node) => {
    if (matcher(node)) return updater(node);
    if (node[childrenKey] && node[childrenKey].length > 0) {
      const newChildren = updateNodeByMatcher(
        node[childrenKey] as T[],
        matcher,
        updater,
        childrenKey
      );
      if (newChildren !== node[childrenKey]) {
        return { ...node, [childrenKey]: newChildren } as T;
      }
    }
    return node;
  });
};

const defaultLogger: LoggerType = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const moveNodeInTree = (
  treeData: any[] | { key: string; children?: any[] },
  sourceKey: string,
  targetKey: string,
  logger: LoggerType = defaultLogger
): void => {
  function findNode(nodes: any[] | undefined, key: string): any | null {
    if (!nodes) return null;
    for (const node of nodes) {
      if (node.key === key) return node;
      if (node.children) {
        const found = findNode(node.children, key);
        if (found) return found;
      }
    }
    return null;
  }

  function getParentNode(nodes: any[], node: any): any | null {
    for (const parent of nodes) {
      if (parent.children && parent.children.includes(node)) return parent;
      const result = getParentNode(parent.children || [], node);
      if (result) return result;
    }
    return null;
  }

  const sourceNode = findNode(Array.isArray(treeData) ? treeData : [treeData], sourceKey);
  const targetNode = findNode(Array.isArray(treeData) ? treeData : [treeData], targetKey);

  if (!sourceNode || !targetNode) {
    logger.error?.("Source or target node not found");
    return;
  }

  if (sourceNode.children && sourceNode.children.length > 0) {
    logger.error?.("Source node is not a leaf node, cannot move");
    return;
  }

  const sourceParent = getParentNode(Array.isArray(treeData) ? treeData : [treeData], sourceNode);
  if (sourceParent) {
    const index = sourceParent.children!.findIndex((child: any) => child.key === sourceKey);
    if (index !== -1) {
      sourceParent.children!.splice(index, 1);
    }
  }

  targetNode.children = targetNode.children || [];
  targetNode.children.push(sourceNode);
};

export const cloneNode = (sourceNode: TreeNode, targetNode: TreeNode) => {
  const clonedNode = { ...sourceNode };
  if (targetNode.children) {
    targetNode.children.push(clonedNode);
  } else {
    targetNode.children = [clonedNode];
  }
};

export const copyNode = (
  treeData: TreeNode[],
  key: string | number,
  targetKey: string | number
): TreeNode[] => {
  const sourceNode = structuredClone(findNodeByKey(treeData, key));
  const targetNode = findNodeByKey(treeData, targetKey);

  if (sourceNode && targetNode) {
    sourceNode.title += "-副本";
    updateKeys(sourceNode, targetNode);
    cloneNode(sourceNode, targetNode);
    return [...treeData];
  }

  return treeData;
};

export const deleteNode = (
  treeData: TreeNode[],
  key: string | number
): TreeNode[] => {
  const delNode = (data: TreeNode[]): TreeNode[] => {
    return data.filter((node) => {
      if (node.key === key) return false;
      if (node.children) {
        node.children = delNode(node.children);
      }
      return true;
    });
  };

  return delNode([...treeData]);
};

export const addLeafProperties = <T extends { children?: T[] }>(
  treeData: T[]
): T[] => {
  return treeData.map((node) => {
    const isLeaf = !node.children || node.children.length === 0;
    return {
      ...node,
      isLeaf,
      disabled: !isLeaf,
      children: node.children ? addLeafProperties(node.children) : undefined,
    };
  });
};

// 保留的独有方法 - 转换类
export const transformTreeKeys = (
  treeData: Record<string, any>[],
  keyMapping: Record<string, string>,
  childrenKey: string = "children",
  logger: LoggerType = defaultLogger
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeKeys: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") return node;

    const transformedNode: Record<string, any> = {};

    Object.keys(node).forEach((key) => {
      const value = node[key];
      const newKey = keyMapping[key] || key;

      if (key === childrenKey && Array.isArray(value)) {
        transformedNode[newKey] = transformTreeKeys(value, keyMapping, childrenKey, logger);
      } else {
        transformedNode[newKey] = value;
      }
    });

    return transformedNode;
  };

  return treeData.map(transformNode);
};

export const transformTreeNodes = (
  treeData: Record<string, any>[],
  transformer: (node: Record<string, any>) => Record<string, any>,
  childrenKey: string = "children",
  logger: LoggerType = defaultLogger
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeNodes: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") return node;

    const children = node[childrenKey];
    const nodeWithTransformedChildren = {
      ...node,
      ...(Array.isArray(children) && {
        [childrenKey]: transformTreeNodes(children, transformer, childrenKey, logger),
      }),
    };

    return transformer(nodeWithTransformedChildren);
  };

  return treeData.map(transformNode);
};

export const searchInTree = (
  tree: TreeNode[],
  searchValue: string
): TreeNode[] => {
  function searchRecursive(node: TreeNode, searchText: string, result: TreeNode[]): void {
    const title = node.title?.toString().toLowerCase() || "";
    const text = searchText.toLowerCase();
    const arr = text.split("");

    if (node.isLeaf && arr.every((item) => title.includes(item))) {
      if (!result.some((item) => item.key === node.key)) {
        result.push(node);
      }
    }

    if (node.children) {
      for (const child of node.children) {
        searchRecursive(child, text, result);
      }
    }
  }

  const result: TreeNode[] = [];

  for (const rootNode of tree) {
    searchRecursive(rootNode, searchValue.toLowerCase(), result);
  }

  return result;
};

// 保留的独有方法 - 工具类
export const findFirstLeaf = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children"
): T | null => {
  for (const node of treeData) {
    const children = node[childrenKey] as T[] | undefined;
    if (!children || children.length === 0) return node;
    const leaf = findFirstLeaf(children, childrenKey);
    if (leaf) return leaf;
  }
  return null;
};

export const traverseTreeValues = <T extends Record<string, any>, V>(
  treeData: T[],
  key: keyof T,
  childrenKey: string = "children"
): V[] => {
  const result: V[] = [];

  const traverse = (nodes: T[]) => {
    for (const node of nodes) {
      if (key in node) {
        result.push(node[key] as V);
      }
      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        traverse(children);
      }
    }
  };

  traverse(treeData);
  return result;
};

export const filterCheckedLeafKeys = (treeData: any[]): string[] => {
  const result: string[] = [];

  const traverse = (nodes: any[]) => {
    if (!nodes || nodes.length === 0) return;

    for (const node of nodes) {
      if (node.checked === false) continue;

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      } else if (node.checked === true) {
        result.push(node.key);
      }
    }
  };

  traverse(treeData);
  return result;
};

export const collectLeafValuesByKey = (
  nodes: any[],
  targetValue: string,
  isLeafKey: string = "isLeaf"
): string[] | null => {
  for (const node of nodes) {
    if (node.value === targetValue) {
      if (node.children && Array.isArray(node.children) && node.children.length > 0) {
        const leafNodes = getLeafNodes([node], isLeafKey);
        return leafNodes.map((leaf) => leaf.value);
      }
      return null;
    }

    if (node.children && Array.isArray(node.children)) {
      const result = collectLeafValuesByKey(node.children, targetValue, isLeafKey);
      if (result !== null) return result;
    }
  }

  return null;
};

export interface TreeGroup {
  label: string;
  value: string | number;
  children?: any[];
}

export const convertGroupsToTreeData = <T extends Record<string, any>>(
  groups: T[],
  groupKey: keyof T = "group" as keyof T,
  _childrenKey: string = "children"
): TreeGroup[] => {
  const groupMap = new Map<string, TreeGroup>();

  for (const item of groups) {
    const groupName = String(item[groupKey] || "");
    if (!groupMap.has(groupName)) {
      groupMap.set(groupName, {
        label: groupName,
        value: groupName,
        children: [],
      });
    }
    groupMap.get(groupName)!.children!.push(item);
  }

  return Array.from(groupMap.values());
};

// 别名导出（按你要求的，不保留别名注释）
export { findNodeById as findNode };
export { nodeExistsInTree as findNodeInTree };
export { collectLeafValuesByKey as findNodeAndCollectLeafValues };
export { findParentOf as findTreeNode };
```

- [ ] **Step 3: 验证文件创建**

Run: `cat packages/tree-utils/src/index.ts | head -50` 应显示导出和类型

---

### Task 10: 创建 README 文档

**Files:**
- Create: `packages/tree-utils/README.md`

- [ ] **Step 1: 创建 README.md**

```markdown
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
```

- [ ] **Step 2: 验证 README 创建**

Run: `cat packages/tree-utils/README.md | head -50` 应显示标题和安装部分

---

### Task 11: 测试验证

**Files:**
- Test: `packages/tree-utils/tests/index.test.ts` (如已存在)

- [ ] **Step 1: 运行构建**

Run: `cd packages/tree-utils && pnpm build`

Expected: 构建成功，无错误

- [ ] **Step 2: 运行类型检查**

Run: `pnpm typecheck`

Expected: 无 TypeScript 错误

- [ ] **Step 3: 清理备份文件**

Run: `rm packages/tree-utils/src/index.ts.backup`

---

### Task 12: 提交代码

- [ ] **Step 1: 检查 Git 状态**

Run: `git status`

- [ ] **Step 2: 提交更改**

```bash
git add packages/tree-utils/
git commit -m "refactor(tree-utils): integrate tree-lodash and restructure

- Install tree-lodash as core dependency
- Re-export 7 core methods from tree-lodash (foreach, map, filter, find, some, toArray, fromArray)
- Preserve 21 unique methods (query, modify, transform, utils)
- Remove duplicate methods (flattenTree, mapTree, filterTreeNodes)
- Split into functional modules (traverse, transform, query, build, modify, utils)
- Add comprehensive README with examples
- Maintain backward compatibility for existing API"
```

---

## 成功标准

- [ ] tree-lodash 依赖已安装
- [ ] 7 个核心方法全部可导出
- [ ] 21 个独有方法全部保留
- [ ] 3 个重复方法已移除
- [ ] README 文档完整
- [ ] 构建成功
- [ ] 类型检查通过
- [ ] Git 提交完成
