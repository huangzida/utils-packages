import { describe, it, expect } from 'vitest'
import {
  isEmail,
  isUrl,
  isIpv4,
  isNumeric,
  isChinese,
  hasDigitAndLetter,
  validOfMap,
} from '../src/index'

describe('@zid-utils/regexps', () => {
  describe('isEmail', () => {
    it('should validate correct email', () => {
      expect(isEmail.test('test@example.com')).toBe(true)
    })
    it('should reject invalid email', () => {
      expect(isEmail.test('invalid')).toBe(false)
    })
  })

  describe('isUrl', () => {
    it('should validate correct url', () => {
      expect(isUrl.test('https://example.com')).toBe(true)
    })
  })

  describe('isIpv4', () => {
    it('should validate correct ipv4', () => {
      expect(isIpv4.test('192.168.1.1')).toBe(true)
    })
  })

  describe('isNumeric', () => {
    it('should validate numeric strings', () => {
      expect(isNumeric.test('12345')).toBe(true)
      expect(isNumeric.test('12a')).toBe(false)
    })
  })

  describe('isChinese', () => {
    it('should validate chinese characters', () => {
      expect(isChinese.test('你好')).toBe(true)
      expect(isChinese.test('hello')).toBe(false)
    })
  })

  describe('hasDigitAndLetter', () => {
    it('should validate strings with digit and letter', () => {
      expect(hasDigitAndLetter.test('abc123')).toBe(true)
      expect(hasDigitAndLetter.test('abc')).toBe(false)
    })
  })

  describe('validOfMap', () => {
    it('should return true for unknown keys', () => {
      expect(validOfMap('unknown', 'test')).toBe(true)
    })
    it('should validate using the correct validator', () => {
      expect(validOfMap('onlyChinese', '你好')).toBe(true)
    })
  })
})
