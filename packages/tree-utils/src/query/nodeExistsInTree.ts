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
