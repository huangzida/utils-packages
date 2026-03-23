/**
 * 节点路径信息
 * @template T - 节点数据类型
 */
export interface PathNode<T> {
  /** 节点数据 */
  node: T;
  /** 深度（根节点为 0） */
  depth: number;
  /** 在兄弟节点中的索引 */
  index: number;
  /** 父节点（根节点为 null） */
  parent: PathNode<T> | null;
  /** 路径字符串，格式：'root/child/grandchild' */
  path: string;
}

/**
 * 获取从根节点到目标节点的完整路径
 * @template T - 树节点类型
 * @param treeData - 树形数据数组
 * @param targetKey - 目标节点的 key
 * @param keyField - key 字段名（默认 'key'）
 * @param childrenKey - 子节点字段名（默认 'children'）
 * @returns PathNode 数组，包含路径上所有节点信息；未找到返回 null
 * @example
 * ```typescript
 * const tree = [{ key: '1', children: [{ key: '1-1' }] }];
 * const path = getNodePath(tree, '1-1');
 * // path = [
 * //   { node: {...}, depth: 0, index: 0, parent: null, path: '1' },
 * //   { node: {...}, depth: 1, index: 0, parent: {...}, path: '1/1-1' }
 * // ]
 * ```
 */
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
