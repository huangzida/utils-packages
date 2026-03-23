export const traverseTreeValues = <T extends Record<string, any>, V>(
  treeData: T[],
  key: keyof T,
  childrenKey: string = "children",
): V[] => {
  const result: V[] = [];

  const traverse = (nodes: T[]) => {
    for (const node of nodes) {
      if (key in node) {
        result.push(node[key] as V);
      }
      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        traverse(children);
      }
    }
  };

  traverse(treeData);
  return result;
};
