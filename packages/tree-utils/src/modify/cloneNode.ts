import type { TreeNode } from "../types";

export const cloneNode = (sourceNode: TreeNode, targetNode: TreeNode) => {
  const clonedNode = { ...sourceNode };
  if (targetNode.children) {
    targetNode.children.push(clonedNode);
  } else {
    targetNode.children = [clonedNode];
  }
};
