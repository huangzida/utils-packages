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
