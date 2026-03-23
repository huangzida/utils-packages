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

export const getNestedValue = <T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  return get(obj, path, defaultValue)
}

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

export const isEmpty = (obj: Record<string, any>): boolean => {
  if (obj == null) return true
  if (typeof obj === 'string') return obj.length === 0
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0
  }
  return false
}

export const values = <T>(obj: Record<string, T>): T[] => {
  return Object.values(obj)
}

export const entries = <K extends string | number | symbol, T>(
  obj: Record<K, T>,
): [K, T][] => {
  return Object.entries(obj) as [K, T][]
}

export const keys = <K extends string | number | symbol>(
  obj: Record<K, any>,
): K[] => {
  return Object.keys(obj) as K[]
}

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

export const keyBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): Record<string, T> => {
  return array.reduce((result, item) => {
    result[String(item[key])] = item
    return result
  }, {} as Record<string, T>)
}

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
