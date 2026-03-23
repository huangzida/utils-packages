export const updateNodeByMatcher = <T extends Record<string, any>>(
  nodes: T[],
  matcher: (node: T) => boolean,
  updater: (node: T) => T,
  childrenKey: string = "children",
): T[] => {
  return nodes.map((node) => {
    if (matcher(node)) {
      return updater(node);
    }

    if (node[childrenKey] && node[childrenKey].length > 0) {
      const newChildren = updateNodeByMatcher(
        node[childrenKey] as T[],
        matcher,
        updater,
        childrenKey,
      );

      if (newChildren !== node[childrenKey]) {
        return {
          ...node,
          [childrenKey]: newChildren,
        } as T;
      }
    }

    return node;
  });
};
