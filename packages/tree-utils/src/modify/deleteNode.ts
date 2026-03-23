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
