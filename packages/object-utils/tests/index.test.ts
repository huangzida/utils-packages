import { describe, it, expect } from 'vitest'
import {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  getNestedValue,
  set,
  has,
  flatten,
  unflatten,
  isEmpty,
  values,
  entries,
  keys,
  mapValues,
  filterKeys,
  invert,
  groupBy,
  keyBy,
  difference,
  intersection,
  bindMethods,
} from '../src/index'

describe('@zid-utils/object-utils', () => {
  describe('deepClone', () => {
    it('should clone primitive', () => {
      expect(deepClone(1)).toBe(1)
      expect(deepClone('hello')).toBe('hello')
    })

    it('should clone object', () => {
      const obj = { a: 1, b: { c: 2 } }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
      expect(cloned.b).not.toBe(obj.b)
    })

    it('should clone array', () => {
      const arr = [1, [2, 3]]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned).not.toBe(arr)
      expect(cloned[1]).not.toBe(arr[1])
    })

    it('should clone Date', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      expect(cloned).toEqual(date)
      expect(cloned).not.toBe(date)
    })
  })

  describe('deepMerge', () => {
    it('should merge objects', () => {
      const result = deepMerge({ a: 1 }, { b: 2 })
      expect(result).toEqual({ a: 1, b: 2 })
    })

    it('should deep merge nested objects', () => {
      const result = deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
      expect(result).toEqual({ a: { b: 1, c: 2 } })
    })

    it('should override with later source', () => {
      const result = deepMerge({ a: 1 }, { a: 2 })
      expect(result).toEqual({ a: 2 })
    })
  })

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })
  })

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
    })
  })

  describe('get', () => {
    const obj = { a: { b: { c: 1 } } }

    it('should get nested value', () => {
      expect(get(obj, 'a.b.c')).toBe(1)
    })

    it('should return default for missing path', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default')
    })

    it('should return undefined for missing path without default', () => {
      expect(get(obj, 'a.b.d')).toBeUndefined()
    })
  })

  describe('set', () => {
    it('should set nested value', () => {
      const obj: any = { a: { b: 1 } }
      set(obj, 'a.c', 2)
      expect(obj.a.c).toBe(2)
    })

    it('should create intermediate objects', () => {
      const obj: any = {}
      set(obj, 'a.b.c', 1)
      expect(obj.a.b.c).toBe(1)
    })
  })

  describe('has', () => {
    const obj = { a: { b: 1 } }

    it('should return true for existing path', () => {
      expect(has(obj, 'a.b')).toBe(true)
    })

    it('should return false for missing path', () => {
      expect(has(obj, 'a.c')).toBe(false)
    })
  })

  describe('flatten', () => {
    it('should flatten nested object', () => {
      expect(flatten({ a: { b: 1 } })).toEqual({ 'a.b': 1 })
    })

    it('should handle custom separator', () => {
      expect(flatten({ a: { b: 1 } }, '__')).toEqual({ 'a__b': 1 })
    })
  })

  describe('unflatten', () => {
    it('should unflatten object', () => {
      expect(unflatten({ 'a.b': 1 })).toEqual({ a: { b: 1 } })
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('should return false for non-empty object', () => {
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('should return true for null', () => {
      expect(isEmpty(null as any)).toBe(true)
    })
  })

  describe('values', () => {
    it('should return object values', () => {
      expect(values({ a: 1, b: 2 })).toEqual([1, 2])
    })
  })

  describe('entries', () => {
    it('should return object entries', () => {
      expect(entries({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]])
    })
  })

  describe('keys', () => {
    it('should return object keys', () => {
      expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b'])
    })
  })

  describe('mapValues', () => {
    it('should map object values', () => {
      const result = mapValues({ a: 1, b: 2 }, (v) => v * 2)
      expect(result).toEqual({ a: 2, b: 4 })
    })
  })

  describe('filterKeys', () => {
    it('should filter keys by predicate', () => {
      const result = filterKeys({ a: 1, b: 2, c: 3 }, (k) => k !== 'b')
      expect(result).toEqual({ a: 1, c: 3 })
    })
  })

  describe('invert', () => {
    it('should invert key-value pairs', () => {
      expect(invert({ a: 'x', b: 'y' })).toEqual({ x: 'a', y: 'b' })
    })
  })

  describe('groupBy', () => {
    it('should group array by key', () => {
      const arr = [{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }]
      const result = groupBy(arr, 'type')
      expect(result).toEqual({
        a: [{ type: 'a', v: 1 }, { type: 'a', v: 3 }],
        b: [{ type: 'b', v: 2 }],
      })
    })
  })

  describe('keyBy', () => {
    it('should index array by key', () => {
      const arr = [{ id: 'x', v: 1 }, { id: 'y', v: 2 }]
      const result = keyBy(arr, 'id')
      expect(result).toEqual({
        x: { id: 'x', v: 1 },
        y: { id: 'y', v: 2 },
      })
    })
  })

  describe('difference', () => {
    it('should return keys with different values', () => {
      const result = difference({ a: 1, b: 2 }, { a: 1, b: 3 })
      expect(result).toEqual({ b: 2 })
    })
  })

  describe('intersection', () => {
    it('should return keys with same values', () => {
      const result = intersection({ a: 1, b: 2 }, { a: 1, b: 3 })
      expect(result).toEqual({ a: 1 })
    })
  })

  describe('getNestedValue', () => {
    it('should be an alias for get', () => {
      expect(getNestedValue({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1)
    })

    it('should return default for missing path', () => {
      expect(getNestedValue({ a: { b: 1 } }, 'a.c', 'default')).toBe('default')
    })
  })

  describe('bindMethods', () => {
    it('should bind methods to instance', () => {
      const obj = {
        value: 10,
        getValue() {
          return this.value
        },
      }
      const bound = bindMethods(obj, ['getValue'])
      const fn = bound.getValue
      expect(fn()).toBe(10)
    })
  })
})
