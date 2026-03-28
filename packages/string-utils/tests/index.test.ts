import { describe, it, expect } from 'vitest'
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  trim,
  truncate,
  escapeHtml,
  unescapeHtml,
  escapeRegExp,
  stripHtml,
  slugify,
  toWords,
  toLines,
  includes,
  startsWith,
  endsWith,
  isEmpty,
  isNotEmpty,
  replaceAll,
  countWords,
  countLines,
  indent,
  template,
} from '../src/index'

describe('@zid-utils/string-utils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('camelCase', () => {
    it('should convert to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld')
      expect(camelCase('foo-bar-baz')).toBe('fooBarBaz')
    })
  })

  describe('kebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world')
      expect(kebabCase('foo_bar_baz')).toBe('foo-bar-baz')
    })
  })

  describe('snakeCase', () => {
    it('should convert to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world')
      expect(snakeCase('foo-bar-baz')).toBe('foo_bar_baz')
    })
  })

  describe('pascalCase', () => {
    it('should convert to PascalCase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld')
    })
  })

  describe('trim', () => {
    it('should trim whitespace', () => {
      expect(trim('  hello  ')).toBe('hello')
    })

    it('should trim custom characters', () => {
      expect(trim('---hello---', '-')).toBe('hello')
    })
  })

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('hello world', 8)).toBe('hello...')
    })

    it('should not truncate short strings', () => {
      expect(truncate('hi', 10)).toBe('hi')
    })
  })

  describe('escapeHtml', () => {
    it('should escape HTML entities', () => {
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
      expect(escapeHtml('a & b')).toBe('a &amp; b')
    })
  })

  describe('unescapeHtml', () => {
    it('should unescape HTML entities', () => {
      expect(unescapeHtml('&lt;div&gt;')).toBe('<div>')
    })
  })

  describe('escapeRegExp', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegExp('a.b*c?d')).toBe('a\\.b\\*c\\?d')
    })
  })

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      expect(stripHtml('<p>Hello</p>')).toBe('Hello')
    })
  })

  describe('slugify', () => {
    it('should create URL-friendly slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
      expect(slugify('  foo  bar  ')).toBe('foo-bar')
    })
  })

  describe('toWords', () => {
    it('should split into words', () => {
      expect(toWords('hello world')).toEqual(['hello', 'world'])
    })
  })

  describe('toLines', () => {
    it('should split into lines', () => {
      expect(toLines('a\nb')).toEqual(['a', 'b'])
    })
  })

  describe('includes', () => {
    it('should check if string includes search', () => {
      expect(includes('hello world', 'world')).toBe(true)
      expect(includes('hello world', 'WORLD', false)).toBe(true)
    })
  })

  describe('startsWith', () => {
    it('should check if string starts with search', () => {
      expect(startsWith('hello', 'hel')).toBe(true)
      expect(startsWith('hello', 'HEL', false)).toBe(true)
    })
  })

  describe('endsWith', () => {
    it('should check if string ends with search', () => {
      expect(endsWith('hello', 'llo')).toBe(true)
    })
  })

  describe('isEmpty', () => {
    it('should check if string is empty', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty('hello')).toBe(false)
    })
  })

  describe('isNotEmpty', () => {
    it('should check if string is not empty', () => {
      expect(isNotEmpty('hello')).toBe(true)
      expect(isNotEmpty('')).toBe(false)
    })
  })

  describe('replaceAll', () => {
    it('should replace all occurrences', () => {
      expect(replaceAll('hello world', 'l', 'x')).toBe('hexxo worxd')
    })
  })

  describe('countWords', () => {
    it('should count words', () => {
      expect(countWords('hello world')).toBe(2)
      expect(countWords('  hello   world  ')).toBe(2)
    })
  })

  describe('countLines', () => {
    it('should count lines', () => {
      expect(countLines('a\nb\nc')).toBe(3)
    })
  })

  describe('indent', () => {
    it('should indent lines', () => {
      expect(indent('a\nb', 2)).toBe('  a\n  b')
    })
  })

  describe('template', () => {
    it('should replace template variables', () => {
      const result = template('Hello {{name}}!', { name: 'World' })
      expect(result).toBe('Hello World!')
    })
  })
})
