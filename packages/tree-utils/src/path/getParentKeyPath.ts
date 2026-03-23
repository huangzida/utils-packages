import { getKeyPathParts } from './getKeyPathParts';

/**
 * 获取父路径
 * @param keyPath - 路径字符串
 * @param separator - 分隔符，默认 '.'
 * @returns 父路径，不存在则返回 null
 *
 * @example
 * ```typescript
 * getParentKeyPath('a.b.c') // 'a.b'
 * getParentKeyPath('a') // null
 * getParentKeyPath('a.b.c', '>') // 'a>b'
 * ```
 */
export const getParentKeyPath = (
  keyPath: string,
  separator: string = '.',
): string | null => {
  const parts = getKeyPathParts(keyPath, separator);

  if (parts.length <= 1) {
    return null;
  }

  parts.pop();
  return parts.join(separator);
};
