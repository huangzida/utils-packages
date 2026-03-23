export const getLeafNodes = (
  treeData: Record<string, any>[],
  isLeafKey: string = "isLeaf",
): Record<string, any>[] => {
  function collectLeafNodes(
    nodes: Record<string, any>[],
  ): Record<string, any>[] {
    const leafNodes: Record<string, any>[] = [];

    for (const node of nodes) {
      if (node[isLeafKey] === true) {
        leafNodes.push(node);
      } else if (node.children) {
        leafNodes.push(...collectLeafNodes(node.children));
      }
    }

    return leafNodes;
  }

  return collectLeafNodes(treeData);
};
