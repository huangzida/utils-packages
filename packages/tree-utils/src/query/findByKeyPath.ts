export interface KeyPathOptions {
  separator?: string;
  keyKey?: string;
  childrenKey?: string;
  keyPathKey?: string;
}

export const defaultKeyPathOptions: KeyPathOptions = {
  separator: '.',
  keyKey: 'key',
  childrenKey: 'children',
  keyPathKey: 'keyPath',
};

/**
 * 根据 key 层级路径查找节点
 * @param treeData - 树形数据数组
 * @param keyPath - 路径字符串，如 'a.b.c'
 * @param options - 配置选项
 * @returns 找到的节点，未找到返回 null
 *
 * @example
 * ```typescript
 * const tree = [{
 *   key: 'a',
 *   children: [{
 *     key: 'b',
 *     children: [{ key: 'c' }]
 *   }]
 * }];
 * const node = findByKeyPath(tree, 'a.b.c');
 * // node = { key: 'c', ... }
 * ```
 */
export const findByKeyPath = (
  treeData: Record<string, any>[],
  keyPath: string,
  options?: KeyPathOptions,
): Record<string, any> | null => {
  const opts = { ...defaultKeyPathOptions, ...options };

  if (!keyPath || keyPath.length === 0) {
    return null;
  }

  const parts = keyPath.split(opts.separator!);

  function findNode(
    nodes: Record<string, any>[],
    key: string,
  ): Record<string, any> | null {
    for (const node of nodes) {
      if (String(node[opts.keyKey!]) === key) {
        return node;
      }
      if (node[opts.childrenKey!]) {
        const found = findNode(node[opts.childrenKey!], key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  let currentNodes = treeData;

  for (const part of parts) {
    const node = findNode(currentNodes, part);
    if (!node) {
      return null;
    }
    if (part === parts[parts.length - 1]) {
      return node;
    }
    if (!node[opts.childrenKey!]) {
      return null;
    }
    currentNodes = node[opts.childrenKey!];
  }

  return null;
};
