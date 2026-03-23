/**
 * 拼接路径片段
 * @param parts - 路径部分（数组或多个参数）
 * @param separator - 分隔符，默认 '.'
 * @returns 拼接后的路径字符串
 *
 * @example
 * ```typescript
 * joinKeyPath('a', 'b', 'c') // 'a.b.c'
 * joinKeyPath(['a', 'b', 'c']) // 'a.b.c'
 * joinKeyPath(['a', 'b'], '/') // 'a/b'
 * ```
 */
export function joinKeyPath(
  parts: string[],
  separator?: string,
): string;
export function joinKeyPath(
  ...parts: string[]
): string;
export function joinKeyPath(
  partsOrFirst: string[] | string,
  separator: string = '.',
): string {
  if (Array.isArray(partsOrFirst)) {
    return partsOrFirst.join(separator);
  }
  return partsOrFirst;
}
