import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sleep, retry, timeout, pDebounce } from '../src/index'

describe('@zid-utils/async-utils', () => {
  describe('sleep', () => {
    it('should resolve after the specified time', async () => {
      const start = Date.now()
      await sleep(100)
      const elapsed = Date.now() - start
      expect(elapsed).toBeGreaterThanOrEqual(90)
      expect(elapsed).toBeLessThan(200)
    })
  })

  describe('retry', () => {
    it('should return the result on success', async () => {
      const fn = vi.fn().mockResolvedValue('success')
      const result = await retry(fn, { attempts: 3 })
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should retry on failure', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success')

      const result = await retry(fn, { attempts: 3, delay: 10 })
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('should call onRetry callback', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success')

      const onRetry = vi.fn()
      await retry(fn, { attempts: 2, delay: 10, onRetry })
      expect(onRetry).toHaveBeenCalledTimes(1)
      expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1)
    })

    it('should throw after all attempts fail', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('fail'))
      await expect(retry(fn, { attempts: 3, delay: 10 })).rejects.toThrow('fail')
      expect(fn).toHaveBeenCalledTimes(3)
    })
  })

  describe('timeout', () => {
    it('should return the result if completed in time', async () => {
      const promise = new Promise<string>((resolve) => {
        setTimeout(() => resolve('success'), 50)
      })
      const result = await timeout(promise, 100)
      expect(result).toBe('success')
    })

    it('should throw on timeout', async () => {
      const promise = new Promise<string>((resolve) => {
        setTimeout(() => resolve('success'), 200)
      })
      await expect(timeout(promise, 50)).rejects.toThrow('Operation timed out')
    })
  })

  describe('pDebounce', () => {
    it('should debounce async function calls', async () => {
      const fn = vi.fn().mockResolvedValue('result')
      const debounced = pDebounce(fn, 50)

      const promise1 = debounced()
      const promise2 = debounced()
      const promise3 = debounced()

      const results = await promise3

      expect(fn).toHaveBeenCalledTimes(1)
      expect(results).toBe('result')
    })

    it('should pass arguments to the function', async () => {
      const fn = vi.fn().mockResolvedValue('result')
      const debounced = pDebounce(fn, 50)

      await debounced('arg1', 'arg2')

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })
})
