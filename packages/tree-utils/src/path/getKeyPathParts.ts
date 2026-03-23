/**
 * 解析路径为数组
 * @param keyPath - 路径字符串
 * @param separator - 分隔符，默认 '.'
 * @returns 路径各部分的数组
 *
 * @example
 * ```typescript
 * getKeyPathParts('a.b.c') // ['a', 'b', 'c']
 * getKeyPathParts('a>b>c', '>') // ['a', 'b', 'c']
 * ```
 */
export const getKeyPathParts = (
  keyPath: string,
  separator: string = '.',
): string[] => {
  if (!keyPath || keyPath.length === 0) {
    return [];
  }
  return keyPath.split(separator).filter((part) => part.length > 0);
};
