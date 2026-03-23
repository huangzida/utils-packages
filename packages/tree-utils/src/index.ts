export type {
  TreeNode,
  TreeNodeInfo,
  FindOptions,
  Logger,
  TreeUtilsConfig,
} from "./types";

import type { TreeNode, Logger as LoggerType } from "./types";

const defaultLogger: LoggerType = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export { default as foreach } from 'tree-lodash';
export { default as map } from 'tree-lodash';
export { default as filter } from 'tree-lodash';
export { default as find } from 'tree-lodash';
export { default as some } from 'tree-lodash';
export { default as toArray } from 'tree-lodash';
export { default as fromArray } from 'tree-lodash';

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

export const updateKeys = (sourceNode: TreeNode, targetNode: TreeNode) => {
  sourceNode.key = `${targetNode.key}-${targetNode.children?.length}`;
  if (sourceNode.children) {
    sourceNode.children.forEach((item, index) => {
      item.key = `${sourceNode.key}-${index}`;
    });
  }
};

export const moveNodeInTree = (
  treeData: any[] | { key: string; children?: any[] },
  sourceKey: string,
  targetKey: string,
  logger: LoggerType = defaultLogger,
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

export const transformTreeKeys = (
  treeData: Record<string, any>[],
  keyMapping: Record<string, string>,
  childrenKey: string = "children",
  logger: LoggerType = defaultLogger,
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

export const transformTreeNodes = (
  treeData: Record<string, any>[],
  transformer: (node: Record<string, any>) => Record<string, any>,
  childrenKey: string = "children",
  logger: LoggerType = defaultLogger,
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

export {
  findNodeById as findNode,
  nodeExistsInTree as findNodeInTree,
  collectLeafValuesByKey as findNodeAndCollectLeafValues,
  findParentOf as findTreeNode,
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

export const getNodeDepth = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): number => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.length - 1 : -1;
};

export const getNodeBreadcrumb = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): T[] => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.map((p) => p.node) : [];
};

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
