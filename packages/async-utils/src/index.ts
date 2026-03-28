export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface RetryOptions {
  attempts?: number
  delay?: number
  onRetry?: (error: Error, attempt: number) => void
}

export const retry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> => {
  const { attempts = 3, delay = 1000, onRetry } = options
  let lastError: Error

  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < attempts) {
        onRetry?.(lastError, i)
        await sleep(delay)
      }
    }
  }

  throw lastError!
}

export const timeout = <T>(
  promise: Promise<T>,
  ms: number,
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), ms),
    ),
  ])
}

export const pDebounce = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(async () => {
        timeoutId = null
        try {
          const result = await fn(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, wait)
    })
  }
}
