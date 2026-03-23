import { describe, it, expect } from 'vitest'
import { updateGridElement } from '../src/index'

describe('@zid-utils/grid-utils', () => {
  const mockGrid = [
    [{ id: '1', name: '1' }, { id: '2', name: '2' }],
    [{ id: '3', name: '3' }, { id: '4', name: '4' }],
  ]

  describe('updateGridElement', () => {
    it('should update matching element', () => {
      const result = updateGridElement(
        mockGrid,
        (item) => item.id === '2',
        (item) => ({ ...item, name: '22', updated: true }),
      )
      expect(result[0][1].name).toBe('22')
      expect(result[0][1].updated).toBe(true)
    })

    it('should return same reference if no match', () => {
      const result = updateGridElement(
        mockGrid,
        (item) => item.id === 'not-exist',
        (item) => ({ ...item, name: 'updated' }),
      )
      expect(result).toBe(mockGrid)
    })
  })
})
