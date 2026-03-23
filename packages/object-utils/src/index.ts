/**
 * 深拷贝对象，支持嵌套对象、数组、Date、Set、Map 等
 * @param obj - 待拷贝的对象
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as T
  }

  if (obj instanceof Set) {
    return new Set(Array.from(obj).map((item) => deepClone(item))) as T
  }

  if (obj instanceof Map) {
    return new Map(
      Array.from(obj.entries()).map(([key, value]) => [
        deepClone(key),
        deepClone(value),
      ]),
    ) as T
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }

  return obj
}

export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        deepMerge(target[key], source[key] as any)
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

const isObject = (item: any): item is Record<string, any> => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 从对象中选取指定的键
 * @param obj - 源对象
 * @param keys - 要选取的键数组
 * @returns 包含指定键的新对象
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * 从对象中排除指定的键
 * @param obj - 源对象
 * @param keys - 要排除的键数组
 * @returns 排除指定键后的新对象
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result as Omit<T, K>
}

/**
 * 获取嵌套对象的值
 * @param obj - 源对象
 * @param path - 属性路径（如 'a.b.c'）
 * @param defaultValue - 默认值
 * @returns 属性值
 */
export const get = <T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  const keys = path.split('.')
  let result: any = obj

  for (const key of keys) {
    if (result == null || !(key in result)) {
      return defaultValue
    }
    result = result[key]
  }

  return result as T
}

/**
 * 获取嵌套对象值的别名
 * @param obj - 源对象
 * @param path - 属性路径
 * @param defaultValue - 默认值
 * @returns 属性值
 */
export const getNestedValue = <T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  return get(obj, path, defaultValue)
}

/**
 * 设置嵌套对象的值
 * @param obj - 源对象
 * @param path - 属性路径
 * @param value - 要设置的值
 * @returns 修改后的对象
 */
export const set = (
  obj: Record<string, any>,
  path: string,
  value: any,
): Record<string, any> => {
  const keys = path.split('.')
  const lastKey = keys.pop()!

  let current: any = obj
  for (const key of keys) {
    if (!(key in current)) {
      current[key] = {}
    }
    current = current[key]
  }

  current[lastKey] = value
  return obj
}

/**
 * 检查对象是否有指定路径的属性
 * @param obj - 源对象
 * @param path - 属性路径
 * @returns 是否存在
 */
export const has = (obj: Record<string, any>, path: string): boolean => {
  const keys = path.split('.')
  let current: any = obj

  for (const key of keys) {
    if (current == null || !(key in current)) {
      return false
    }
    current = current[key]
  }

  return true
}

/**
 * 扁平化嵌套对象
 * @param obj - 嵌套对象
 * @param separator - 键分隔符（默认 '.'）
 * @returns 扁平化后的对象
 */
export const flatten = (
  obj: Record<string, any>,
  separator: string = '.',
): Record<string, any> => {
  const result: Record<string, any> = {}

  const flattenRecursive = (current: any, prefix: string = '') => {
    for (const key in current) {
      if (!current.hasOwnProperty(key)) continue

      const newKey = prefix ? `${prefix}${separator}${key}` : key

      if (
        current[key] !== null &&
        typeof current[key] === 'object' &&
        !Array.isArray(current[key])
      ) {
        flattenRecursive(current[key], newKey)
      } else {
        result[newKey] = current[key]
      }
    }
  }

  flattenRecursive(obj)
  return result
}

/**
 * 反扁平化对象
 * @param obj - 扁平化对象
 * @param separator - 键分隔符（默认 '.'）
 * @returns 嵌套对象
 */
export const unflatten = (
  obj: Record<string, any>,
  separator: string = '.',
): Record<string, any> => {
  const result: Record<string, any> = {}

  for (const path in obj) {
    if (!obj.hasOwnProperty(path)) continue

    const keys = path.split(separator)
    let current = result

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current)) {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = obj[path]
  }

  return result
}

/**
 * 检查对象是否为空
 * @param obj - 待检查对象
 * @returns 是否为空
 */
export const isEmpty = (obj: Record<string, any>): boolean => {
  if (obj == null) return true
  if (typeof obj === 'string') return obj.length === 0
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0
  }
  return false
}

/**
 * 获取对象的所有值
 * @param obj - 源对象
 * @returns 值数组
 */
export const values = <T>(obj: Record<string, T>): T[] => {
  return Object.values(obj)
}

/**
 * 获取对象的所有键值对
 * @param obj - 源对象
 * @returns 键值对数组
 */
export const entries = <K extends string | number | symbol, T>(
  obj: Record<K, T>,
): [K, T][] => {
  return Object.entries(obj) as [K, T][]
}

/**
 * 获取对象的所有键
 * @param obj - 源对象
 * @returns 键数组
 */
export const keys = <K extends string | number | symbol>(
  obj: Record<K, any>,
): K[] => {
  return Object.keys(obj) as K[]
}

/**
 * 遍历对象的值并转换
 * @param obj - 源对象
 * @param fn - 值转换函数
 * @returns 转换后的新对象
 */
export const mapValues = <T extends Record<string, any>, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> => {
  const result = {} as Record<keyof T, U>
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(obj[key], key)
    }
  }
  return result
}

/**
 * 根据条件过滤键
 * @param obj - 源对象
 * @param predicate - 键过滤函数
 * @returns 过滤后的对象
 */
export const filterKeys = <T extends Record<string, any>>(
  obj: T,
  predicate: (key: string) => boolean,
): Partial<T> => {
  const result: Partial<T> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(key)) {
      result[key as keyof T] = obj[key]
    }
  }
  return result
}

/**
 * 交换对象的键和值
 * @param obj - 源对象
 * @returns 键值交换后的对象
 */
export const invert = <T extends Record<string, string>>(
  obj: T,
): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key
    }
  }
  return result
}

/**
 * 按键对数组分组
 * @param array - 源数组
 * @param key - 分组键
 * @returns 分组后的对象
 */
export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * 以键索引数组元素
 * @param array - 源数组
 * @param key - 索引键
 * @returns 以键索引的对象
 */
export const keyBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): Record<string, T> => {
  return array.reduce((result, item) => {
    result[String(item[key])] = item
    return result
  }, {} as Record<string, T>)
}

/**
 * 获取两个对象的不同属性
 * @param obj1 - 源对象
 * @param obj2 - 比较对象
 * @returns obj1 中与 obj2 不同的属性
 */
export const difference = <T extends Record<string, any>>(
  obj1: T,
  obj2: Partial<T>,
): Partial<T> => {
  const result: Partial<T> = {}
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
      result[key] = obj1[key]
    }
  }
  return result
}

/**
 * 获取两个对象的相同属性
 * @param obj1 - 源对象
 * @param obj2 - 比较对象
 * @returns obj1 中与 obj2 相同的属性
 */
export const intersection = <T extends Record<string, any>>(
  obj1: T,
  obj2: Partial<T>,
): Partial<T> => {
  const result: Partial<T> = {}
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      result[key] = obj1[key]
    }
  }
  return result
}

/**
 * 绑定对象的方法到自身
 * @param instance - 对象实例
 * @param methodNames - 要绑定的方法名数组
 * @returns 绑定后的实例
 */
export function bindMethods<T extends Record<string, any>>(
  instance: T,
  methodNames: (keyof T)[],
): T {
  for (const name of methodNames) {
    const method = instance[name]
    if (typeof method === 'function') {
      ;(instance as any)[name] = method.bind(instance)
    }
  }
  return instance
}
