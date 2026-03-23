import { describe, it, expect } from 'vitest'
import { padZero, formatTime, formatTimeDetail } from '../src/index'

describe('@zid-utils/time-utils', () => {
  describe('padZero', () => {
    it('should pad single digit numbers', () => {
      expect(padZero(5)).toBe('05')
      expect(padZero(9)).toBe('09')
    })
    it('should handle custom length', () => {
      expect(padZero(5, 3)).toBe('005')
    })
  })

  describe('formatTime', () => {
    it('should format seconds to time string', () => {
      expect(formatTime(125)).toBe('02:05')
    })
    it('should include hours when present', () => {
      expect(formatTime(3665)).toBe('01:01:05')
    })
    it('should handle NaN', () => {
      expect(formatTime(NaN)).toBe('00:00')
    })
  })

  describe('formatTimeDetail', () => {
    it('should return detailed time object', () => {
      const result = formatTimeDetail(3665)
      expect(result.hours).toBe('01')
      expect(result.minutes).toBe('01')
      expect(result.seconds).toBe('05')
      expect(result.displayTime).toBe('01:01:05')
    })
  })
})
