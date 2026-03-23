import { describe, it, expect } from 'vitest'
import { arraysEqual, diff, isObject, deepEqual } from '../src/index'

describe('@zid-utils/diff-utils', () => {
  describe('arraysEqual', () => {
    it('should return true for equal arrays', () => {
      expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true)
      expect(arraysEqual(['a', 'b'], ['a', 'b'])).toBe(true)
    })

    it('should return false for different length arrays', () => {
      expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false)
    })

    it('should return false for different elements', () => {
      expect(arraysEqual([1, 2, 3], [1, 2, 4])).toBe(false)
    })

    it('should handle empty arrays', () => {
      expect(arraysEqual([], [])).toBe(true)
      expect(arraysEqual([], [1])).toBe(false)
    })

    it('should handle duplicate elements', () => {
      expect(arraysEqual([1, 1, 2], [1, 2, 1])).toBe(true)
      expect(arraysEqual([1, 1, 2], [1, 1, 1])).toBe(false)
    })
  })

  describe('diff', () => {
    it('should return null/undefined for equal objects', () => {
      const obj = { a: 1, b: 2 }
      expect(diff(obj, { a: 1, b: 2 })).toBeFalsy()
    })

    it('should return differences', () => {
      const result = diff({ a: 1, b: 2 }, { a: 1, b: 3 })
      expect(result).toEqual({ b: 3 })
    })

    it('should return all new values', () => {
      const result = diff({ a: 1 }, { a: 2, b: 3 })
      expect(result).toEqual({ a: 2, b: 3 })
    })

    it('should handle nested objects', () => {
      const result = diff(
        { a: { nested: 1 } },
        { a: { nested: 2 } },
      )
      expect(result).toEqual({ a: { nested: 2 } })
    })

    it('should handle array changes', () => {
      const result = diff({ arr: [1, 2] }, { arr: [1, 3] })
      expect(result).toEqual({ arr: [1, 3] })
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject(undefined)).toBe(false)
    })
  })

  describe('deepEqual', () => {
    it('should return true for equal primitives', () => {
      expect(deepEqual(1, 1)).toBe(true)
      expect(deepEqual('a', 'a')).toBe(true)
      expect(deepEqual(true, true)).toBe(true)
    })

    it('should return false for different primitives', () => {
      expect(deepEqual(1, 2)).toBe(false)
      expect(deepEqual('a', 'b')).toBe(false)
    })

    it('should handle equal objects', () => {
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true)
      expect(deepEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true)
    })

    it('should handle unequal objects', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false)
    })

    it('should handle equal arrays', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
      expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true)
    })

    it('should handle unequal arrays', () => {
      expect(deepEqual([1, 2], [1, 2, 3])).toBe(false)
      expect(deepEqual([1, 2], [1, 3])).toBe(false)
    })

    it('should handle null', () => {
      expect(deepEqual(null, null)).toBe(true)
      expect(deepEqual(null, {})).toBe(false)
    })
  })
})
