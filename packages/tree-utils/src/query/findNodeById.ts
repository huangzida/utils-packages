export const findNodeById = (nodes: any[], id: string): any => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};
