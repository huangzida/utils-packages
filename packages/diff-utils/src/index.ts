/**
 * 比较两个数组是否相等（考虑重复元素）
 * @param a - 第一个数组
 * @param b - 第二个数组
 * @returns 是否相等
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false
  const counter = new Map<T, number>()
  for (const value of a) {
    counter.set(value, (counter.get(value) || 0) + 1)
  }
  for (const value of b) {
    const count = counter.get(value)
    if (count === undefined || count === 0) {
      return false
    }
    counter.set(value, count - 1)
  }
  return true
}

type DiffResult<T> = Partial<{
  [K in keyof T]: T[K] extends object ? DiffResult<T[K]> : T[K]
}>

/**
 * 比较两个对象的差异
 * @param obj1 - 源对象
 * @param obj2 - 目标对象
 * @returns 差异对象或 null
 */
export function diff<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
): DiffResult<T> | null {
  function findDifferences(o1: unknown, o2: unknown): unknown {
    if (Array.isArray(o1) && Array.isArray(o2)) {
      if (!arraysEqual(o1, o2)) {
        return o2
      }
      return undefined
    }

    if (
      typeof o1 === 'object' &&
      typeof o2 === 'object' &&
      o1 !== null &&
      o2 !== null
    ) {
      const diffResult: Record<string, unknown> = {}

      const keys1 = o1 ? Object.keys(o1 as object) : []
      const keys2 = o2 ? Object.keys(o2 as object) : []
      const allKeys = new Set([...keys1, ...keys2])

      allKeys.forEach((key) => {
        const valueDiff = findDifferences(
          (o1 as Record<string, unknown>)[key],
          (o2 as Record<string, unknown>)[key],
        )
        if (valueDiff !== undefined) {
          diffResult[key] = valueDiff
        }
      })

      return Object.keys(diffResult).length > 0 ? diffResult : undefined
    }

    return o1 === o2 ? undefined : o2
  }

  const result = findDifferences(obj1, obj2)
  return result as DiffResult<T> | null
}

/**
 * 检查值是否为普通对象
 * @param value - 待检查的值
 * @returns 是否为普通对象
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 深度比较两个值是否相等
 * @param a - 第一个值
 * @param b - 第二个值
 * @returns 是否相等
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a === null || b === null) return a === b
  if (typeof a !== 'object') return a === b

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => deepEqual(item, b[index]))
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => deepEqual(a[key], b[key]))
  }

  return false
}
