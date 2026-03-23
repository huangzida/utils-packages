/**
 * 获取树的统计信息
 * @template T - 树节点类型
 * @param treeData - 树形数据数组
 * @param childrenKey - 子节点字段名（默认 'children'）
 * @returns 包含总节点数、最大深度、叶子节点数的对象
 * @example
 * ```typescript
 * const tree = [{ key: '1', children: [{ key: '1-1', isLeaf: true }] }];
 * const stats = getTreeStats(tree);
 * // { totalNodes: 2, maxDepth: 1, leafCount: 1 }
 * ```
 */
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
