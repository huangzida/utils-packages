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
