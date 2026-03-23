import { describe, it, expect } from 'vitest'
import {
  unique,
  uniqueByField,
  chunk,
  groupBy,
  flatten,
  difference,
  intersection,
  sortBy,
  shuffle,
  zip,
  partition,
  sample,
  range,
} from '../src/index'

describe('@zid-utils/array-utils', () => {
  describe('unique', () => {
    it('should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    })

    it('should handle strings', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('should handle empty array', () => {
      expect(unique([])).toEqual([])
    })
  })

  describe('uniqueByField', () => {
    it('should remove duplicates by field', () => {
      const arr = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }]
      expect(uniqueByField(arr, 'id')).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'b' }])
    })

    it('should handle empty array', () => {
      expect(uniqueByField([], 'id')).toEqual([])
    })
  })

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('should handle uneven division', () => {
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]])
    })

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]])
    })
  })

  describe('groupBy', () => {
    it('should group by string key', () => {
      const arr = [
        { type: 'a', value: 1 },
        { type: 'b', value: 2 },
        { type: 'a', value: 3 },
      ]
      const result = groupBy(arr, (item) => item.type)
      expect(result).toEqual({
        a: [{ type: 'a', value: 1 }, { type: 'a', value: 3 }],
        b: [{ type: 'b', value: 2 }],
      })
    })
  })

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, 5])
    })

    it('should handle flat array', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
    })
  })

  describe('difference', () => {
    it('should return elements in first but not second', () => {
      expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3])
    })

    it('should handle no difference', () => {
      expect(difference([1, 2], [1, 2])).toEqual([])
    })
  })

  describe('intersection', () => {
    it('should return common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
    })

    it('should handle no intersection', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })
  })

  describe('sortBy', () => {
    it('should sort by key ascending', () => {
      const arr = [{ a: 3 }, { a: 1 }, { a: 2 }]
      expect(sortBy(arr, (item) => item.a)).toEqual([
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ])
    })

    it('should sort by key descending', () => {
      const arr = [{ a: 3 }, { a: 1 }, { a: 2 }]
      expect(sortBy(arr, (item) => item.a, 'desc')).toEqual([
        { a: 3 },
        { a: 2 },
        { a: 1 },
      ])
    })
  })

  describe('shuffle', () => {
    it('should return array of same length', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(shuffle(arr)).toHaveLength(5)
    })

    it('should contain same elements', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('zip', () => {
    it('should combine two arrays', () => {
      expect(zip([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']])
    })

    it('should stop at shorter array', () => {
      expect(zip([1, 2, 3], ['a'])).toEqual([[1, 'a']])
    })
  })

  describe('partition', () => {
    it('should split array by predicate', () => {
      const [pass, fail] = partition([1, 2, 3, 4], (n) => n % 2 === 0)
      expect(pass).toEqual([2, 4])
      expect(fail).toEqual([1, 3])
    })
  })

  describe('sample', () => {
    it('should return random elements', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(sample(arr, 3)).toHaveLength(3)
    })

    it('should return single element by default', () => {
      const arr = [1, 2, 3]
      expect(sample(arr)).toHaveLength(1)
    })
  })

  describe('range', () => {
    it('should generate range', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
    })

    it('should handle step', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    })

    it('should handle negative step', () => {
      expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1])
    })
  })
})
