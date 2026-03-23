export const filterCheckedLeafKeys = (treeData: any[]): string[] => {
  const result: string[] = [];

  const traverse = (nodes: any[]) => {
    if (!nodes || nodes.length === 0) return;

    for (const node of nodes) {
      if (node.checked === false) continue;

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      } else if (node.checked === true) {
        result.push(node.key);
      }
    }
  };

  traverse(treeData);
  return result;
};
