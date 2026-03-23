import { findByKeyPath, type KeyPathOptions } from './findByKeyPath';

/**
 * 检查路径是否存在
 * @param treeData - 树形数据数组
 * @param keyPath - 路径字符串
 * @param options - 配置选项
 * @returns 路径存在返回 true
 *
 * @example
 * ```typescript
 * const tree = [{ key: 'a', children: [{ key: 'b' }] }];
 * hasKeyPath(tree, 'a.b') // true
 * hasKeyPath(tree, 'a.c') // false
 * ```
 */
export const hasKeyPath = (
  treeData: Record<string, any>[],
  keyPath: string,
  options?: KeyPathOptions,
): boolean => {
  return findByKeyPath(treeData, keyPath, options) !== null;
};
