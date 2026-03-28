export const noop = (): void => {
  return
}

export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false
  let result: any
  return ((...args: any[]) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, any>()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void => {
  let lastTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - lastTime)
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastTime = now
      fn(...args)
    }
  }
}

type AnyFunction = (...args: any[]) => any

export const compose =
  (...fns: AnyFunction[]): AnyFunction =>
  (x: any) =>
    fns.reduceRight((v, f) => f(v), x)

export const pipe =
  (...fns: AnyFunction[]): AnyFunction =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)

export const curry = <T extends AnyFunction>(
  fn: T,
  arity: number = fn.length,
): AnyFunction => {
  return function curried(...args: any[]): any {
    if (args.length >= arity) {
      return fn(...args)
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs)
  }
}
