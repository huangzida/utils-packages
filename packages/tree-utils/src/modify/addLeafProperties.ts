export const addLeafProperties = <T extends { children?: T[] }>(
  treeData: T[],
): T[] => {
  return treeData.map((node) => {
    const isLeaf = !node.children || node.children.length === 0;
    return {
      ...node,
      isLeaf,
      disabled: !isLeaf,
      children: node.children ? addLeafProperties(node.children) : undefined,
    };
  });
};
