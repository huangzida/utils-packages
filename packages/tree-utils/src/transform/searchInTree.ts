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
