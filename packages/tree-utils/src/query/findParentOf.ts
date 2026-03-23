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
