import { type KeyPathOptions, defaultKeyPathOptions } from '../query/findByKeyPath';

/**
 * 自动为每个节点生成 keyPath 属性
 * @param treeData - 树形数据数组
 * @param options - 配置选项
 * @returns 返回新的树数据（不修改原数据）
 *
 * @example
 * ```typescript
 * const tree = [{ key: 'a', children: [{ key: 'b' }] }];
 * const result = autoGenerateKeyPath(tree);
 * // result = [
 * //   { key: 'a', keyPath: 'a', children: [{ key: 'b', keyPath: 'a.b' }] }
 * // ]
 * ```
 */
export const autoGenerateKeyPath = (
  treeData: Record<string, any>[],
  options?: KeyPathOptions,
): Record<string, any>[] => {
  const opts = { ...defaultKeyPathOptions, ...options };

  function traverse(
    nodes: Record<string, any>[],
    parentPath: string | null,
  ): Record<string, any>[] {
    return nodes.map((node) => {
      const key = node[opts.keyKey!];
      const currentPath = parentPath
        ? `${parentPath}${opts.separator}${key}`
        : String(key);

      const newNode = { ...node };

      newNode[opts.keyPathKey!] = currentPath;

      if (node[opts.childrenKey!] && Array.isArray(node[opts.childrenKey!])) {
        newNode[opts.childrenKey!] = traverse(
          node[opts.childrenKey!],
          currentPath,
        );
      }

      return newNode;
    });
  }

  return traverse(treeData, null);
};
