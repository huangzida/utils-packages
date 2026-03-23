import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatBytes,
  formatDuration,
  formatPhone,
  formatIdCard,
  formatCreditCard,
  abbreviateNumber,
  parseFormattedNumber,
  round,
  clamp,
} from '../src/index'

describe('@zid-utils/format-utils', () => {
  describe('formatNumber', () => {
    it('should format with thousands separator', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
    })

    it('should format with decimals', () => {
      expect(formatNumber(1234.567, { decimals: 2 })).toBe('1,234.57')
    })

    it('should format zero', () => {
      expect(formatNumber(0)).toBe('0')
    })
  })

  describe('formatCurrency', () => {
    it('should format USD', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('should format CNY', () => {
      expect(formatCurrency(1234.56, 'CNY')).toBe('¥1,234.56')
    })

    it('should format EUR', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
    })
  })

  describe('formatPercent', () => {
    it('should format as percentage', () => {
      expect(formatPercent(0.25)).toBe('25%')
    })

    it('should format with decimals', () => {
      expect(formatPercent(0.255, 1)).toBe('25.5%')
    })
  })

  describe('formatBytes', () => {
    it('should format bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
    })

    it('should format KB', () => {
      expect(formatBytes(1024)).toBe('1 KB')
    })

    it('should format MB', () => {
      expect(formatBytes(1048576)).toBe('1 MB')
    })

    it('should format GB', () => {
      expect(formatBytes(1073741824)).toBe('1 GB')
    })
  })

  describe('formatDuration', () => {
    it('should format seconds', () => {
      expect(formatDuration(45)).toBe('0:45')
    })

    it('should format minutes and seconds', () => {
      expect(formatDuration(125)).toBe('2:05')
    })

    it('should format hours', () => {
      expect(formatDuration(3661)).toBe('1:01:01')
    })
  })

  describe('formatPhone', () => {
    it('should format CN phone', () => {
      expect(formatPhone('13812345678')).toBe('138-1234-5678')
    })

    it('should format US phone', () => {
      expect(formatPhone('5551234567', 'US')).toBe('(555) 123-4567')
    })

    it('should format international phone', () => {
      expect(formatPhone('8613812345678', 'international')).toBe('+86 138 1234 5678')
    })
  })

  describe('formatIdCard', () => {
    it('should format 18-digit ID', () => {
      expect(formatIdCard('110101199001011234')).toBe('110101 1990 0101 1234')
    })

    it('should format 15-digit ID', () => {
      expect(formatIdCard('110101900101123')).toBe('110101 900101 123')
    })
  })

  describe('formatCreditCard', () => {
    it('should format credit card number', () => {
      expect(formatCreditCard('4111111111111111')).toBe('4111 1111 1111 1111')
    })
  })

  describe('abbreviateNumber', () => {
    it('should format K', () => {
      expect(abbreviateNumber(1500)).toBe('1.5K')
    })

    it('should format W', () => {
      expect(abbreviateNumber(15000)).toBe('1.5W')
    })

    it('should format M', () => {
      expect(abbreviateNumber(1500000)).toBe('1.5M')
    })

    it('should format B', () => {
      expect(abbreviateNumber(15000000)).toBe('1.5B')
    })
  })

  describe('parseFormattedNumber', () => {
    it('should parse formatted number', () => {
      expect(parseFormattedNumber('1,234.56')).toBe(1234.56)
    })

    it('should parse currency', () => {
      expect(parseFormattedNumber('$1,234.56')).toBe(1234.56)
    })
  })

  describe('round', () => {
    it('should round to integer', () => {
      expect(round(1.5)).toBe(2)
    })

    it('should round to decimals', () => {
      expect(round(1.234, 2)).toBe(1.23)
    })
  })

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('should clamp to min', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('should clamp to max', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })
})
