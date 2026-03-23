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
