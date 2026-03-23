import { describe, it, expect } from 'vitest'
import {
  parseUrl,
  buildUrl,
  getParam,
  setParam,
  deleteParam,
  getHash,
  setHash,
  isAbsoluteUrl,
  isRelativeUrl,
  joinUrl,
  extractDomain,
  extractPath,
  getAllParams,
  hasParam,
  removeTrailingSlash,
  addTrailingSlash,
} from '../src/index'

describe('@zid-utils/url-utils', () => {
  const testUrl = 'https://example.com/path?a=1&b=2#section'

  describe('parseUrl', () => {
    it('should parse valid URL', () => {
      const result = parseUrl(testUrl)
      expect(result).not.toBeNull()
      expect(result?.hostname).toBe('example.com')
    })

    it('should return null for invalid URL', () => {
      expect(parseUrl('not-a-url')).toBeNull()
    })
  })

  describe('buildUrl', () => {
    it('should build URL with params', () => {
      const result = buildUrl('https://example.com', { a: 1, b: 'hello' })
      expect(result).toContain('a=1')
      expect(result).toContain('b=hello')
    })

    it('should build URL without params', () => {
      const result = buildUrl('https://example.com')
      expect(result).toBe('https://example.com/')
    })
  })

  describe('getParam', () => {
    it('should get param value', () => {
      expect(getParam(testUrl, 'a')).toBe('1')
      expect(getParam(testUrl, 'b')).toBe('2')
    })

    it('should return null for missing param', () => {
      expect(getParam(testUrl, 'c')).toBeNull()
    })
  })

  describe('setParam', () => {
    it('should set param value', () => {
      const result = setParam(testUrl, 'c', '3')
      expect(result).toContain('c=3')
    })

    it('should update existing param', () => {
      const result = setParam(testUrl, 'a', '99')
      expect(result).toContain('a=99')
    })
  })

  describe('deleteParam', () => {
    it('should delete param', () => {
      const result = deleteParam(testUrl, 'a')
      expect(result).not.toContain('a=1')
      expect(result).toContain('b=2')
    })
  })

  describe('getHash', () => {
    it('should get hash', () => {
      expect(getHash(testUrl)).toBe('#section')
    })

    it('should return empty string for no hash', () => {
      expect(getHash('https://example.com')).toBe('')
    })
  })

  describe('setHash', () => {
    it('should set hash', () => {
      const result = setHash('https://example.com', 'new-hash')
      expect(result).toContain('#new-hash')
    })
  })

  describe('isAbsoluteUrl', () => {
    it('should return true for absolute URLs', () => {
      expect(isAbsoluteUrl('https://example.com')).toBe(true)
      expect(isAbsoluteUrl('http://example.com')).toBe(true)
    })

    it('should return false for relative URLs', () => {
      expect(isAbsoluteUrl('/path')).toBe(false)
      expect(isAbsoluteUrl('path')).toBe(false)
    })
  })

  describe('isRelativeUrl', () => {
    it('should return true for relative URLs', () => {
      expect(isRelativeUrl('/path')).toBe(true)
    })
  })

  describe('joinUrl', () => {
    it('should join URL parts', () => {
      expect(joinUrl('a', 'b', 'c')).toBe('a/b/c')
    })

    it('should handle trailing slashes', () => {
      expect(joinUrl('a/', '/b/', '/c')).toBe('a/b/c')
    })
  })

  describe('extractDomain', () => {
    it('should extract domain', () => {
      expect(extractDomain(testUrl)).toBe('example.com')
    })

    it('should return null for invalid URL', () => {
      expect(extractDomain('not-a-url')).toBeNull()
    })
  })

  describe('extractPath', () => {
    it('should extract path', () => {
      expect(extractPath(testUrl)).toBe('/path')
    })
  })

  describe('getAllParams', () => {
    it('should get all params', () => {
      const params = getAllParams(testUrl)
      expect(params).toEqual({ a: '1', b: '2' })
    })
  })

  describe('hasParam', () => {
    it('should check if param exists', () => {
      expect(hasParam(testUrl, 'a')).toBe(true)
      expect(hasParam(testUrl, 'c')).toBe(false)
    })
  })

  describe('removeTrailingSlash', () => {
    it('should remove trailing slash', () => {
      expect(removeTrailingSlash('https://example.com/')).toBe('https://example.com')
    })
  })

  describe('addTrailingSlash', () => {
    it('should add trailing slash', () => {
      expect(addTrailingSlash('https://example.com')).toBe('https://example.com/')
    })
  })
})
