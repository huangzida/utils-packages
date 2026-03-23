import { describe, it, expect } from 'vitest'
import { padZero, formatTime, formatTimeDetail, formatRelativeTime } from '../src/index'

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

  describe('formatRelativeTime', () => {
    it('should return "刚刚" for recent timestamps (zh-CN)', () => {
      const now = Date.now()
      const result = formatRelativeTime(now - 30000, 'zh-CN')
      expect(result).toBe('刚刚')
    })

    it('should return "just now" for recent timestamps (en-US)', () => {
      const now = Date.now()
      const result = formatRelativeTime(now - 30000, 'en-US')
      expect(result).toBe('just now')
    })

    it('should format minutes correctly (zh-CN)', () => {
      const now = Date.now()
      const fiveMinutesAgo = now - 5 * 60 * 1000
      const result = formatRelativeTime(fiveMinutesAgo, 'zh-CN')
      expect(result).toBe('5分钟前')
    })

    it('should format minutes correctly (en-US)', () => {
      const now = Date.now()
      const fiveMinutesAgo = now - 5 * 60 * 1000
      const result = formatRelativeTime(fiveMinutesAgo, 'en-US')
      expect(result).toBe('5 minutes ago')
    })

    it('should format hours correctly (zh-CN)', () => {
      const now = Date.now()
      const threeHoursAgo = now - 3 * 60 * 60 * 1000
      const result = formatRelativeTime(threeHoursAgo, 'zh-CN')
      expect(result).toBe('3小时前')
    })

    it('should format days correctly (zh-CN)', () => {
      const now = Date.now()
      const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000
      const result = formatRelativeTime(twoDaysAgo, 'zh-CN')
      expect(result).toBe('2天前')
    })

    it('should handle future timestamps (zh-CN)', () => {
      const now = Date.now()
      const oneHourLater = now + 60 * 60 * 1000
      const result = formatRelativeTime(oneHourLater, 'zh-CN')
      expect(result).toBe('1小时后')
    })

    it('should handle future timestamps (en-US)', () => {
      const now = Date.now()
      const oneHourLater = now + 60 * 60 * 1000
      const result = formatRelativeTime(oneHourLater, 'en-US')
      expect(result).toBe('1 hour later')
    })
  })
})
