export interface PathNode<T> {
  node: T;
  depth: number;
  index: number;
  parent: PathNode<T> | null;
  path: string;
}

export const getNodePath = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): PathNode<T>[] | null => {
  const findPath = (
    nodes: T[],
    target: string | number,
    currentPath: PathNode<T>[],
  ): PathNode<T>[] | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const newPathNode: PathNode<T> = {
        node,
        depth: currentPath.length,
        index: i,
        parent:
          currentPath.length > 0 ? currentPath[currentPath.length - 1] : null,
        path:
          currentPath.length === 0
            ? String(node[keyField])
            : `${currentPath[currentPath.length - 1].path}/${String(node[keyField])}`,
      };

      if (node[keyField] === target) {
        return [...currentPath, newPathNode];
      }

      const children = node[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        const result = findPath(children, target, [
          ...currentPath,
          newPathNode,
        ]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return findPath(treeData, targetKey, []);
};
