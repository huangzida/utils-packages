export const getTreeStats = <T extends Record<string, any>>(
  treeData: T[],
  childrenKey: string = "children",
): { totalNodes: number; maxDepth: number; leafCount: number } => {
  let totalNodes = 0;
  let maxDepth = 0;
  let leafCount = 0;

  const traverse = (nodes: T[], depth: number) => {
    for (const node of nodes) {
      totalNodes++;
      maxDepth = Math.max(maxDepth, depth);

      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        traverse(children, depth + 1);
      } else {
        leafCount++;
      }
    }
  };

  traverse(treeData, 0);
  return { totalNodes, maxDepth, leafCount };
};
