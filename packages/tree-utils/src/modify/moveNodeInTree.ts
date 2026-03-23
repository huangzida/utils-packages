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
