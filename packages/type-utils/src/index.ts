export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number' && !Number.isNaN(val)
}

export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean'
}

export const isArray = (val: unknown): val is Array<unknown> => {
  return Array.isArray(val)
}

export const isObject = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export const isFunction = (val: unknown): val is (...args: any[]) => any => {
  return typeof val === 'function'
}

export const isNull = (val: unknown): val is null => {
  return val === null
}

export const isUndefined = (val: unknown): val is undefined => {
  return val === undefined
}

export const isEmpty = (val: unknown): boolean => {
  if (val == null) return true
  if (isArray(val)) return val.length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  if (isString(val)) return val.trim().length === 0
  return false
}

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction((val as Promise<T>).then)
}
