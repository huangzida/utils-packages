# Tree-Utils 模块化拆分实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 tree-utils/index.ts 从 641 行拆分为 28 个独立的方法文件，每个方法一个文件，index.ts 只做统一导出

**Architecture:** 采用扁平化模块结构，按功能分为 traverse/query/modify/transform/build/utils 六大模块，每个方法独立文件

**Tech Stack:** TypeScript, tree-lodash

---

## 文件结构映射

### 将创建的文件（28个方法文件）

```
packages/tree-utils/src/
├── traverse/
│   ├── foreach.ts              # 来自 tree-lodash
│   ├── toArray.ts             # 来自 tree-lodash
│   └── index.ts               # re-export
├── query/
│   ├── getLeafNodes.ts
│   ├── findNodeByKey.ts
│   ├── findNodeById.ts
│   ├── findNodeByMatcher.ts
│   ├── nodeExistsInTree.ts
│   ├── findParentOf.ts
│   ├── getNodePath.ts         # 导出 PathNode 类型
│   ├── getNodeDepth.ts
│   ├── getNodeBreadcrumb.ts
│   ├── getTreeStats.ts
│   ├── find.ts                # 来自 tree-lodash
│   ├── some.ts                # 来自 tree-lodash
│   └── index.ts               # re-export
├── modify/
│   ├── updateKeys.ts
│   ├── updateNodeTitleByKey.ts
│   ├── updateNodeByMatcher.ts
│   ├── moveNodeInTree.ts
│   ├── cloneNode.ts
│   ├── copyNode.ts
│   ├── deleteNode.ts
│   ├── addLeafProperties.ts
│   └── index.ts               # re-export
├── transform/
│   ├── map.ts                 # 来自 tree-lodash
│   ├── filter.ts              # 来自 tree-lodash
│   ├── transformTreeKeys.ts
│   ├── transformTreeNodes.ts
│   ├── searchInTree.ts
│   └── index.ts               # re-export
├── build/
│   ├── fromArray.ts           # 来自 tree-lodash
│   └── index.ts               # re-export
└── utils/
    ├── findFirstLeaf.ts
    ├── traverseTreeValues.ts
    ├── filterCheckedLeafKeys.ts
    ├── collectLeafValuesByKey.ts
    ├── convertGroupsToTreeData.ts  # 导出 TreeGroup 类型
    └── index.ts               # re-export
```

### 将修改的文件

```
packages/tree-utils/src/
├── index.ts                   # 重写为统一导出（< 50 行）
├── types.ts                   # 添加 PathNode, TreeGroup 类型导出
└── README.md                   # 更新文档（移除别名）
```

---

## 实施任务

### Task 1: 创建 traverse 模块文件

**Files:**
- Create: `packages/tree-utils/src/traverse/foreach.ts`
- Create: `packages/tree-utils/src/traverse/toArray.ts`
- Modify: `packages/tree-utils/src/traverse/index.ts`

- [ ] **Step 1: 创建 foreach.ts**

```typescript
export { default } from 'tree-lodash';
```

- [ ] **Step 2: 创建 toArray.ts**

```typescript
export { default } from 'tree-lodash';
```

- [ ] **Step 3: 更新 traverse/index.ts**

```typescript
export { default as foreach } from './foreach';
export { default as toArray } from './toArray';
```

---

### Task 2: 创建 query 模块 - Part 1 (getLeafNodes, findNodeByKey, findNodeById)

**Files:**
- Create: `packages/tree-utils/src/query/getLeafNodes.ts`
- Create: `packages/tree-utils/src/query/findNodeByKey.ts`
- Create: `packages/tree-utils/src/query/findNodeById.ts`

- [ ] **Step 1: 创建 getLeafNodes.ts**

```typescript
export const getLeafNodes = (
  treeData: Record<string, any>[],
  isLeafKey: string = "isLeaf",
): Record<string, any>[] => {
  function collectLeafNodes(
    nodes: Record<string, any>[],
  ): Record<string, any>[] {
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
```

- [ ] **Step 2: 创建 findNodeByKey.ts**

```typescript
import type { TreeNode } from "../types";

export const findNodeByKey = (
  treeData: TreeNode[],
  key: string | number,
): TreeNode | null => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const foundNode = findNodeByKey(node.children, key);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};
```

- [ ] **Step 3: 创建 findNodeById.ts**

```typescript
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
```

---

### Task 3: 创建 query 模块 - Part 2 (findNodeByMatcher, nodeExistsInTree, findParentOf)

**Files:**
- Create: `packages/tree-utils/src/query/findNodeByMatcher.ts`
- Create: `packages/tree-utils/src/query/nodeExistsInTree.ts`
- Create: `packages/tree-utils/src/query/findParentOf.ts`

- [ ] **Step 1: 创建 findNodeByMatcher.ts**

```typescript
export const findNodeByMatcher = (
  nodes: any[],
  matcher: (node: any) => boolean,
  childrenKey: string = "children",
): any | null => {
  for (const node of nodes) {
    if (matcher(node)) {
      return node;
    }
    if (node[childrenKey]) {
      const found = findNodeByMatcher(node[childrenKey], matcher, childrenKey);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
```

- [ ] **Step 2: 创建 nodeExistsInTree.ts**

```typescript
export const nodeExistsInTree = (
  nodes: any[],
  searchValue: string,
): boolean => {
  return nodes.some((node) => {
    if (node.value === searchValue || node.title === searchValue) {
      return true;
    }
    if (node.children && Array.isArray(node.children)) {
      return nodeExistsInTree(node.children, searchValue);
    }
    return false;
  });
};
```

- [ ] **Step 3: 创建 findParentOf.ts**

```typescript
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
```

---

### Task 4: 创建 query 模块 - Part 3 (getNodePath, getNodeDepth, getNodeBreadcrumb)

**Files:**
- Create: `packages/tree-utils/src/query/getNodePath.ts` (导出 PathNode 类型)
- Create: `packages/tree-utils/src/query/getNodeDepth.ts`
- Create: `packages/tree-utils/src/query/getNodeBreadcrumb.ts`

- [ ] **Step 1: 创建 getNodePath.ts**

```typescript
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
  childrenKey: string = "children",
): PathNode<T>[] | null => {
  const findPath = (
    nodes: T[],
    target: string | number,
    currentPath: PathNode<T>[],
  ): PathNode<T>[] | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const newPathNode: PathNode<T> = {
        node,
        depth: currentPath.length,
        index: i,
        parent:
          currentPath.length > 0 ? currentPath[currentPath.length - 1] : null,
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
        const result = findPath(children, target, [
          ...currentPath,
          newPathNode,
        ]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return findPath(treeData, targetKey, []);
};
```

- [ ] **Step 2: 创建 getNodeDepth.ts**

```typescript
import { getNodePath } from "./getNodePath";

export const getNodeDepth = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): number => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.length - 1 : -1;
};
```

- [ ] **Step 3: 创建 getNodeBreadcrumb.ts**

```typescript
import { getNodePath } from "./getNodePath";

export const getNodeBreadcrumb = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): T[] => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.map((p) => p.node) : [];
};
```

---

### Task 5: 创建 query 模块 - Part 4 (getTreeStats, find, some)

**Files:**
- Create: `packages/tree-utils/src/query/getTreeStats.ts`
- Create: `packages/tree-utils/src/query/find.ts`
- Create: `packages/tree-utils/src/query/some.ts`

- [ ] **Step 1: 创建 getTreeStats.ts**

```typescript
export const getTreeStats = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children",
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
```

- [ ] **Step 2: 创建 find.ts**

```typescript
export { default } from 'tree-lodash';
```

- [ ] **Step 3: 创建 some.ts**

```typescript
export { default } from 'tree-lodash';
```

---

### Task 6: 创建 query 模块 - index.ts

**Files:**
- Modify: `packages/tree-utils/src/query/index.ts`

- [ ] **Step 1: 更新 query/index.ts**

```typescript
export { default as find } from './find';
export { default as some } from './some';
export { getLeafNodes } from './getLeafNodes';
export { findNodeByKey } from './findNodeByKey';
export { findNodeById } from './findNodeById';
export { findNodeByMatcher } from './findNodeByMatcher';
export { nodeExistsInTree } from './nodeExistsInTree';
export { findParentOf } from './findParentOf';
export {
  getNodePath,
  type PathNode,
} from './getNodePath';
export { getNodeDepth } from './getNodeDepth';
export { getNodeBreadcrumb } from './getNodeBreadcrumb';
export { getTreeStats } from './getTreeStats';
```

---

### Task 7: 创建 modify 模块 - Part 1 (updateKeys, updateNodeTitleByKey, updateNodeByMatcher)

**Files:**
- Create: `packages/tree-utils/src/modify/updateKeys.ts`
- Create: `packages/tree-utils/src/modify/updateNodeTitleByKey.ts`
- Create: `packages/tree-utils/src/modify/updateNodeByMatcher.ts`

- [ ] **Step 1: 创建 updateKeys.ts**

```typescript
import type { TreeNode } from "../types";

export const updateKeys = (sourceNode: TreeNode, targetNode: TreeNode) => {
  sourceNode.key = `${targetNode.key}-${targetNode.children?.length}`;
  if (sourceNode.children) {
    sourceNode.children.forEach((item, index) => {
      item.key = `${sourceNode.key}-${index}`;
    });
  }
};
```

- [ ] **Step 2: 创建 updateNodeTitleByKey.ts**

```typescript
import type { TreeNode } from "../types";

export const updateNodeTitleByKey = (
  tree: TreeNode[],
  targetKey: string,
  newTitle: string,
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
```

- [ ] **Step 3: 创建 updateNodeByMatcher.ts**

```typescript
export const updateNodeByMatcher = <T extends Record<string, any>>(
  nodes: T[],
  matcher: (node: T) => boolean,
  updater: (node: T) => T,
  childrenKey: string = "children",
): T[] => {
  return nodes.map((node) => {
    if (matcher(node)) {
      return updater(node);
    }

    if (node[childrenKey] && node[childrenKey].length > 0) {
      const newChildren = updateNodeByMatcher(
        node[childrenKey] as T[],
        matcher,
        updater,
        childrenKey,
      );

      if (newChildren !== node[childrenKey]) {
        return {
          ...node,
          [childrenKey]: newChildren,
        } as T;
      }
    }

    return node;
  });
};
```

---

### Task 8: 创建 modify 模块 - Part 2 (moveNodeInTree, cloneNode, copyNode)

**Files:**
- Create: `packages/tree-utils/src/modify/moveNodeInTree.ts`
- Create: `packages/tree-utils/src/modify/cloneNode.ts`
- Create: `packages/tree-utils/src/modify/copyNode.ts`

- [ ] **Step 1: 创建 moveNodeInTree.ts**

```typescript
import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const moveNodeInTree = (
  treeData: any[] | { key: string; children?: any[] },
  sourceKey: string,
  targetKey: string,
  logger: Logger = defaultLogger,
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
      if (parent.children && parent.children.includes(node)) {
        return parent;
      }
      const result = getParentNode(parent.children || [], node);
      if (result) return result;
    }
    return null;
  }

  const sourceNode = findNode(
    Array.isArray(treeData) ? treeData : [treeData],
    sourceKey,
  );
  const targetNode = findNode(
    Array.isArray(treeData) ? treeData : [treeData],
    targetKey,
  );

  if (!sourceNode || !targetNode) {
    logger.error?.('Source or target node not found')
    return
  }

  if (sourceNode.children && sourceNode.children.length > 0) {
    logger.error?.('Source node is not a leaf node, cannot move')
    return
  }

  const sourceParent = getParentNode(
    Array.isArray(treeData) ? treeData : [treeData],
    sourceNode,
  );
  if (sourceParent) {
    const index = sourceParent.children!.findIndex(
      (child: any) => child.key === sourceKey,
    );
    if (index !== -1) {
      sourceParent.children!.splice(index, 1);
    }
  }

  targetNode.children = targetNode.children || [];
  targetNode.children.push(sourceNode);
};
```

- [ ] **Step 2: 创建 cloneNode.ts**

```typescript
import type { TreeNode } from "../types";

export const cloneNode = (sourceNode: TreeNode, targetNode: TreeNode) => {
  const clonedNode = { ...sourceNode };
  if (targetNode.children) {
    targetNode.children.push(clonedNode);
  } else {
    targetNode.children = [clonedNode];
  }
};
```

- [ ] **Step 3: 创建 copyNode.ts**

```typescript
import type { TreeNode } from "./types";
import { findNodeByKey } from "../query/findNodeByKey";
import { updateKeys } from "./updateKeys";
import { cloneNode } from "./cloneNode";

export const copyNode = (
  treeData: TreeNode[],
  key: string | number,
  targetKey: string | number,
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
```

---

### Task 9: 创建 modify 模块 - Part 3 (deleteNode, addLeafProperties)

**Files:**
- Create: `packages/tree-utils/src/modify/deleteNode.ts`
- Create: `packages/tree-utils/src/modify/addLeafProperties.ts`

- [ ] **Step 1: 创建 deleteNode.ts**

```typescript
import type { TreeNode } from "../types";

export const deleteNode = (
  treeData: TreeNode[],
  key: string | number,
): TreeNode[] => {
  const delNode = (data: TreeNode[]): TreeNode[] => {
    return data.filter((node) => {
      if (node.key === key) {
        return false;
      }
      if (node.children) {
        node.children = delNode(node.children);
      }
      return true;
    });
  };

  return delNode([...treeData]);
};
```

- [ ] **Step 2: 创建 addLeafProperties.ts**

```typescript
export const addLeafProperties = <T extends { children?: T[] }>(
  treeData: T[],
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
```

---

### Task 10: 创建 modify 模块 - index.ts

**Files:**
- Modify: `packages/tree-utils/src/modify/index.ts`

- [ ] **Step 1: 更新 modify/index.ts**

```typescript
export { updateKeys } from './updateKeys';
export { updateNodeTitleByKey } from './updateNodeTitleByKey';
export { updateNodeByMatcher } from './updateNodeByMatcher';
export { moveNodeInTree } from './moveNodeInTree';
export { cloneNode } from './cloneNode';
export { copyNode } from './copyNode';
export { deleteNode } from './deleteNode';
export { addLeafProperties } from './addLeafProperties';
```

---

### Task 11: 创建 transform 模块 - Part 1 (map, filter)

**Files:**
- Create: `packages/tree-utils/src/transform/map.ts`
- Create: `packages/tree-utils/src/transform/filter.ts`

- [ ] **Step 1: 创建 map.ts**

```typescript
export { default } from 'tree-lodash';
```

- [ ] **Step 2: 创建 filter.ts**

```typescript
export { default } from 'tree-lodash';
```

---

### Task 12: 创建 transform 模块 - Part 2 (transformTreeKeys, transformTreeNodes, searchInTree)

**Files:**
- Create: `packages/tree-utils/src/transform/transformTreeKeys.ts`
- Create: `packages/tree-utils/src/transform/transformTreeNodes.ts`
- Create: `packages/tree-utils/src/transform/searchInTree.ts`

- [ ] **Step 1: 创建 transformTreeKeys.ts**

```typescript
import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const transformTreeKeys = (
  treeData: Record<string, any>[],
  keyMapping: Record<string, string>,
  childrenKey: string = "children",
  logger: Logger = defaultLogger,
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeKeys: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") {
      return node;
    }

    const transformedNode: Record<string, any> = {};

    Object.keys(node).forEach((key) => {
      const value = node[key];
      const newKey = keyMapping[key] || key;

      if (key === childrenKey && Array.isArray(value)) {
        transformedNode[newKey] = transformTreeKeys(
          value,
          keyMapping,
          childrenKey,
          logger,
        );
      } else {
        transformedNode[newKey] = value;
      }
    });

    return transformedNode;
  };

  return treeData.map(transformNode);
};
```

- [ ] **Step 2: 创建 transformTreeNodes.ts**

```typescript
import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const transformTreeNodes = (
  treeData: Record<string, any>[],
  transformer: (node: Record<string, any>) => Record<string, any>,
  childrenKey: string = "children",
  logger: Logger = defaultLogger,
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeNodes: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") {
      return node;
    }

    const children = node[childrenKey];
    const nodeWithTransformedChildren = {
      ...node,
      ...(Array.isArray(children) && {
        [childrenKey]: transformTreeNodes(
          children,
          transformer,
          childrenKey,
          logger,
        ),
      }),
    };

    return transformer(nodeWithTransformedChildren);
  };

  return treeData.map(transformNode);
};
```

- [ ] **Step 3: 创建 searchInTree.ts**

```typescript
import type { TreeNode } from "../types";

export const searchInTree = (
  tree: TreeNode[],
  searchValue: string,
): TreeNode[] => {
  function searchRecursive(
    node: TreeNode,
    searchText: string,
    result: TreeNode[],
  ): void {
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
```

---

### Task 13: 创建 transform 模块 - index.ts

**Files:**
- Modify: `packages/tree-utils/src/transform/index.ts`

- [ ] **Step 1: 更新 transform/index.ts**

```typescript
export { default as map } from './map';
export { default as filter } from './filter';
export { transformTreeKeys } from './transformTreeKeys';
export { transformTreeNodes } from './transformTreeNodes';
export { searchInTree } from './searchInTree';
```

---

### Task 14: 创建 build 模块

**Files:**
- Create: `packages/tree-utils/src/build/fromArray.ts`
- Modify: `packages/tree-utils/src/build/index.ts`

- [ ] **Step 1: 创建 fromArray.ts**

```typescript
export { default } from 'tree-lodash';
```

- [ ] **Step 2: 更新 build/index.ts**

```typescript
export { default as fromArray } from './fromArray';
```

---

### Task 15: 创建 utils 模块 - Part 1 (findFirstLeaf, traverseTreeValues)

**Files:**
- Create: `packages/tree-utils/src/utils/findFirstLeaf.ts`
- Create: `packages/tree-utils/src/utils/traverseTreeValues.ts`

- [ ] **Step 1: 创建 findFirstLeaf.ts**

```typescript
export const findFirstLeaf = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children",
): T | null => {
  for (const node of treeData) {
    const children = node[childrenKey] as T[] | undefined;
    if (!children || children.length === 0) {
      return node;
    }
    const leaf = findFirstLeaf(children, childrenKey);
    if (leaf) return leaf;
  }
  return null;
};
```

- [ ] **Step 2: 创建 traverseTreeValues.ts**

```typescript
export const traverseTreeValues = <T extends Record<string, any>, V>(
  treeData: T[],
  key: keyof T,
  childrenKey: string = "children",
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
```

---

### Task 16: 创建 utils 模块 - Part 2 (filterCheckedLeafKeys, collectLeafValuesByKey, convertGroupsToTreeData)

**Files:**
- Create: `packages/tree-utils/src/utils/filterCheckedLeafKeys.ts`
- Create: `packages/tree-utils/src/utils/collectLeafValuesByKey.ts`
- Create: `packages/tree-utils/src/utils/convertGroupsToTreeData.ts` (导出 TreeGroup 类型)

- [ ] **Step 1: 创建 filterCheckedLeafKeys.ts**

```typescript
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
```

- [ ] **Step 2: 创建 collectLeafValuesByKey.ts**

```typescript
import { getLeafNodes } from "../query/getLeafNodes";

export const collectLeafValuesByKey = (
  nodes: any[],
  targetValue: string,
  isLeafKey: string = "isLeaf",
): string[] | null => {
  for (const node of nodes) {
    if (node.value === targetValue) {
      if (
        node.children &&
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        const leafNodes = getLeafNodes([node], isLeafKey);
        return leafNodes.map((leaf) => leaf.value);
      }
      return null;
    }

    if (node.children && Array.isArray(node.children)) {
      const result = collectLeafValuesByKey(
        node.children,
        targetValue,
        isLeafKey,
      );
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
};
```

- [ ] **Step 3: 创建 convertGroupsToTreeData.ts**

```typescript
export interface TreeGroup {
  label: string;
  value: string | number;
  children?: any[];
}

export const convertGroupsToTreeData = <T extends Record<string, any>>(
  groups: T[],
  groupKey: keyof T = "group" as keyof T,
  _childrenKey: string = "children",
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
```

---

### Task 17: 创建 utils 模块 - index.ts

**Files:**
- Modify: `packages/tree-utils/src/utils/index.ts`

- [ ] **Step 1: 更新 utils/index.ts**

```typescript
export { findFirstLeaf } from './findFirstLeaf';
export { traverseTreeValues } from './traverseTreeValues';
export { filterCheckedLeafKeys } from './filterCheckedLeafKeys';
export { collectLeafValuesByKey } from './collectLeafValuesByKey';
export {
  convertGroupsToTreeData,
  type TreeGroup,
} from './convertGroupsToTreeData';
```

---

### Task 18: 重写主入口 index.ts

**Files:**
- Backup: `packages/tree-utils/src/index.ts`
- Modify: `packages/tree-utils/src/index.ts`

- [ ] **Step 1: 备份当前 index.ts**

Run: `cp packages/tree-utils/src/index.ts packages/tree-utils/src/index.ts.backup`

- [ ] **Step 2: 重写 index.ts**

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

// 接口类型导出
export type { PathNode } from "./query/getNodePath";
export type { TreeGroup } from "./utils/convertGroupsToTreeData";

// traverse 模块
export { default as foreach } from "./traverse/foreach";
export { default as toArray } from "./traverse/toArray";

// query 模块
export { default as find } from "./query/find";
export { default as some } from "./query/some";
export { getLeafNodes } from "./query/getLeafNodes";
export { findNodeByKey } from "./query/findNodeByKey";
export { findNodeById } from "./query/findNodeById";
export { findNodeByMatcher } from "./query/findNodeByMatcher";
export { nodeExistsInTree } from "./query/nodeExistsInTree";
export { findParentOf } from "./query/findParentOf";
export { getNodePath, type PathNode } from "./query/getNodePath";
export { getNodeDepth } from "./query/getNodeDepth";
export { getNodeBreadcrumb } from "./query/getNodeBreadcrumb";
export { getTreeStats } from "./query/getTreeStats";

// modify 模块
export { updateKeys } from "./modify/updateKeys";
export { updateNodeTitleByKey } from "./modify/updateNodeTitleByKey";
export { updateNodeByMatcher } from "./modify/updateNodeByMatcher";
export { moveNodeInTree } from "./modify/moveNodeInTree";
export { cloneNode } from "./modify/cloneNode";
export { copyNode } from "./modify/copyNode";
export { deleteNode } from "./modify/deleteNode";
export { addLeafProperties } from "./modify/addLeafProperties";

// transform 模块
export { default as map } from "./transform/map";
export { default as filter } from "./transform/filter";
export { transformTreeKeys } from "./transform/transformTreeKeys";
export { transformTreeNodes } from "./transform/transformTreeNodes";
export { searchInTree } from "./transform/searchInTree";

// build 模块
export { default as fromArray } from "./build/fromArray";

// utils 模块
export { findFirstLeaf } from "./utils/findFirstLeaf";
export { traverseTreeValues } from "./utils/traverseTreeValues";
export { filterCheckedLeafKeys } from "./utils/filterCheckedLeafKeys";
export { collectLeafValuesByKey } from "./utils/collectLeafValuesByKey";
export { convertGroupsToTreeData, type TreeGroup } from "./utils/convertGroupsToTreeData";
```

- [ ] **Step 3: 验证行数**

Run: `wc -l packages/tree-utils/src/index.ts`
Expected: < 50 行

---

### Task 19: 测试验证

**Files:**
- Test: `packages/tree-utils/`

- [ ] **Step 1: 运行构建**

Run: `cd packages/tree-utils && pnpm build`
Expected: 构建成功，无错误

- [ ] **Step 2: 运行类型检查**

Run: `pnpm typecheck`
Expected: 无 TypeScript 错误

- [ ] **Step 3: 验证所有方法导出**

Run: `grep -r "export" packages/tree-utils/src/index.ts | wc -l`
Expected: > 40 行

---

### Task 20: 更新 README 文档

**Files:**
- Modify: `packages/tree-utils/README.md`

- [ ] **Step 1: 更新 README**

移除以下别名文档：
- findNode (指向 findNodeById)
- findNodeInTree (指向 nodeExistsInTree)
- findNodeAndCollectLeafValues (指向 collectLeafValuesByKey)
- findTreeNode (指向 findParentOf)

保留核心 API 文档，添加 PathNode 和 TreeGroup 类型说明

- [ ] **Step 2: 验证 README**

Run: `cat packages/tree-utils/README.md | head -50`
Expected: 包含安装和核心方法文档

---

### Task 21: 清理备份文件

- [ ] **Step 1: 删除备份文件**

Run: `rm packages/tree-utils/src/index.ts.backup`
Expected: 文件已删除

---

### Task 22: Git 提交

- [ ] **Step 1: 检查 Git 状态**

Run: `git status`

- [ ] **Step 2: 提交更改**

```bash
git add packages/tree-utils/src/
git commit -m "refactor(tree-utils): modularize into separate files

- Split 641-line index.ts into 28 method files
- Each method has its own file for better maintainability
- Create 6 modules: traverse, query, modify, transform, build, utils
- Remove redundant aliases (findNode, findNodeInTree, etc.)
- Keep single README with core API documentation
- All exports unified in index.ts (< 50 lines)"
```

---

## 成功标准

- [ ] index.ts < 50 行
- [ ] 28 个方法文件创建
- [ ] 6 个模块 index.ts 创建
- [ ] 构建成功
- [ ] 类型检查通过
- [ ] README 更新完成
- [ ] Git 提交完成

---

## 文件清单

**总共创建/修改的文件：**
- 28 个方法文件
- 6 个模块 index.ts
- 1 个主 index.ts
- 1 个 README.md
- 1 个 Git commit
