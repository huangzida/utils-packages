import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  noop,
  once,
  memoize,
  debounce,
  throttle,
  compose,
  pipe,
  curry,
} from '../src/index'

describe('@zid-utils/fn-utils', () => {
  describe('noop', () => {
    it('should do nothing', () => {
      expect(noop()).toBeUndefined()
    })
  })

  describe('once', () => {
    it('should only call the function once', () => {
      const fn = vi.fn()
      const wrapped = once(fn)
      wrapped()
      wrapped()
      wrapped()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should return the result on all calls', () => {
      const fn = vi.fn().mockReturnValue(42)
      const wrapped = once(fn)
      expect(wrapped()).toBe(42)
      expect(wrapped()).toBe(42)
      expect(wrapped()).toBe(42)
    })
  })

  describe('memoize', () => {
    it('should cache the result', () => {
      const fn = vi.fn().mockReturnValue(42)
      const wrapped = memoize(fn)
      expect(wrapped()).toBe(42)
      expect(wrapped()).toBe(42)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should cache based on arguments', () => {
      const fn = vi.fn().mockImplementation((n: number) => n * 2)
      const wrapped = memoize(fn)
      expect(wrapped(1)).toBe(2)
      expect(wrapped(1)).toBe(2)
      expect(wrapped(2)).toBe(4)
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should delay the function call', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 300)
      debounced()
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(300)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should reset the timer on subsequent calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 300)
      debounced()
      vi.advanceTimersByTime(100)
      debounced()
      vi.advanceTimersByTime(100)
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(300)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to the function', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 300)
      debounced('arg1', 'arg2')
      vi.advanceTimersByTime(300)
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should call the function immediately on first call', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 300)
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should not call again within the wait period', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 300)
      throttled()
      vi.advanceTimersByTime(100)
      throttled()
      vi.advanceTimersByTime(100)
      throttled()
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should call again after the wait period', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 300)
      throttled()
      vi.advanceTimersByTime(300)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('compose', () => {
    it('should compose functions from right to left', () => {
      const addOne = (x: number) => x + 1
      const double = (x: number) => x * 2
      const composed = compose(double, addOne)
      expect(composed(5)).toBe(12)
    })

    it('should handle multiple functions', () => {
      const addOne = (x: number) => x + 1
      const double = (x: number) => x * 2
      const subtractThree = (x: number) => x - 3
      const composed = compose(subtractThree, double, addOne)
      expect(composed(5)).toBe(9)
    })

    it('should handle single function', () => {
      const addOne = (x: number) => x + 1
      const composed = compose(addOne)
      expect(composed(5)).toBe(6)
    })
  })

  describe('pipe', () => {
    it('should pipe functions from left to right', () => {
      const addOne = (x: number) => x + 1
      const double = (x: number) => x * 2
      const piped = pipe(addOne, double)
      expect(piped(5)).toBe(12)
    })

    it('should handle multiple functions', () => {
      const addOne = (x: number) => x + 1
      const double = (x: number) => x * 2
      const subtractThree = (x: number) => x - 3
      const piped = pipe(addOne, double, subtractThree)
      expect(piped(5)).toBe(9)
    })

    it('should handle single function', () => {
      const addOne = (x: number) => x + 1
      const piped = pipe(addOne)
      expect(piped(5)).toBe(6)
    })
  })

  describe('curry', () => {
    it('should curry a function', () => {
      const add = (a: number, b: number, c: number) => a + b + c
      const curried = curry(add)
      expect(curried(1)(2)(3)).toBe(6)
    })

    it('should allow partial application', () => {
      const add = (a: number, b: number, c: number) => a + b + c
      const curried = curry(add)
      const addOne = curried(1)
      const addOneAndTwo = addOne(2)
      expect(addOneAndTwo(3)).toBe(6)
    })

    it('should handle curried function with single argument', () => {
      const identity = (x: number) => x
      const curried = curry(identity)
      expect(curried(5)).toBe(5)
    })

    it('should call immediately when enough arguments provided', () => {
      const add = (a: number, b: number) => a + b
      const curried = curry(add)
      expect(curried(1, 2)).toBe(3)
    })
  })
})
