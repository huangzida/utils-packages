import { type KeyPathOptions, defaultKeyPathOptions } from '../query/findByKeyPath';

/**
 * 构建 keyPath 到节点的 Map（用于 O(1) 查询）
 * @param treeData - 树形数据数组（需要有 keyPath 属性）
 * @param options - 配置选项
 * @returns keyPath 到节点的 Map
 *
 * @example
 * ```typescript
 * const tree = [
 *   { keyPath: 'a', value: 1 },
 *   { keyPath: 'a.b', value: 2 }
 * ];
 * const map = buildKeyPathMap(tree);
 * map.get('a.b') // { keyPath: 'a.b', value: 2 }
 * ```
 */
export const buildKeyPathMap = (
  treeData: Record<string, any>[],
  options?: KeyPathOptions,
): Map<string, Record<string, any>> => {
  const opts = { ...defaultKeyPathOptions, ...options };
  const map = new Map<string, Record<string, any>>();

  function traverse(nodes: Record<string, any>[]) {
    for (const node of nodes) {
      const keyPath = node[opts.keyPathKey!];
      if (keyPath !== undefined && keyPath !== null) {
        map.set(String(keyPath), node);
      }

      if (node[opts.childrenKey!] && Array.isArray(node[opts.childrenKey!])) {
        traverse(node[opts.childrenKey!]);
      }
    }
  }

  traverse(treeData);
  return map;
};
