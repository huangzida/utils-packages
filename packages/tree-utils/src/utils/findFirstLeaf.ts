export const findFirstLeaf = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children",
): T | null => {
  for (const node of treeData) {
    const children = node[childrenKey] as T[] | undefined;
    if (!children || children.length === 0) {
      return node;
    }
    const leaf = findFirstLeaf(children, childrenKey);
    if (leaf) return leaf;
  }
  return null;
};
