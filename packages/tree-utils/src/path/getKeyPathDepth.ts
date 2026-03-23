import { getKeyPathParts } from './getKeyPathParts';

/**
 * 获取路径深度
 * @param keyPath - 路径字符串
 * @param separator - 分隔符，默认 '.'
 * @returns 路径深度（层级数）
 *
 * @example
 * ```typescript
 * getKeyPathDepth('a.b.c') // 3
 * getKeyPathDepth('a') // 1
 * getKeyPathDepth('a>b>c', '>') // 3
 * ```
 */
export const getKeyPathDepth = (
  keyPath: string,
  separator: string = '.',
): number => {
  return getKeyPathParts(keyPath, separator).length;
};
