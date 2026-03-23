import type { TreeNode } from "../types";

export const updateKeys = (sourceNode: TreeNode, targetNode: TreeNode) => {
  sourceNode.key = `${targetNode.key}-${targetNode.children?.length}`;
  if (sourceNode.children) {
    sourceNode.children.forEach((item, index) => {
      item.key = `${sourceNode.key}-${index}`;
    });
  }
};
