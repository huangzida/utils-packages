import { describe, it, expect } from 'vitest'
import {
  isValidHex,
  isValidRgb,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  lighten,
  darken,
  saturate,
  desaturate,
  isDark,
  isLight,
  mix,
  nameToHex,
} from '../src/index'

describe('@zid-utils/color-utils', () => {
  describe('isValidHex', () => {
    it('should validate 6-digit hex', () => {
      expect(isValidHex('#ffffff')).toBe(true)
      expect(isValidHex('ffffff')).toBe(true)
    })

    it('should validate 3-digit hex', () => {
      expect(isValidHex('#fff')).toBe(true)
      expect(isValidHex('fff')).toBe(true)
    })

    it('should reject invalid hex', () => {
      expect(isValidHex('#gggggg')).toBe(false)
      expect(isValidHex('not-a-color')).toBe(false)
    })
  })

  describe('isValidRgb', () => {
    it('should validate valid RGB', () => {
      expect(isValidRgb({ r: 255, g: 0, b: 0 })).toBe(true)
    })

    it('should reject out of range RGB', () => {
      expect(isValidRgb({ r: 256, g: 0, b: 0 })).toBe(false)
    })
  })

  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should convert short hex to RGB', () => {
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull()
    })
  })

  describe('rgbToHex', () => {
    it('should convert RGB to hex', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000')
    })

    it('should handle black', () => {
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000')
    })
  })

  describe('rgbToHsl', () => {
    it('should convert RGB to HSL', () => {
      const hsl = rgbToHsl({ r: 255, g: 0, b: 0 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(100)
      expect(hsl.l).toBe(50)
    })

    it('should handle white', () => {
      const hsl = rgbToHsl({ r: 255, g: 255, b: 255 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(0)
      expect(hsl.l).toBe(100)
    })
  })

  describe('hslToRgb', () => {
    it('should convert HSL to RGB', () => {
      const rgb = hslToRgb({ h: 0, s: 100, l: 50 })
      expect(rgb).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should handle gray', () => {
      const rgb = hslToRgb({ h: 0, s: 0, l: 50 })
      expect(rgb.r).toBe(rgb.g)
      expect(rgb.g).toBe(rgb.b)
    })
  })

  describe('hexToHsl', () => {
    it('should convert hex to HSL', () => {
      const hsl = hexToHsl('#ff0000')
      expect(hsl?.h).toBe(0)
      expect(hsl?.s).toBe(100)
      expect(hsl?.l).toBe(50)
    })
  })

  describe('hslToHex', () => {
    it('should convert HSL to hex', () => {
      expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe('#ff0000')
    })
  })

  describe('lighten', () => {
    it('should lighten color', () => {
      expect(lighten('#000000', 20)).toBe('#333333')
    })
  })

  describe('darken', () => {
    it('should darken color', () => {
      expect(darken('#ffffff', 20)).toBe('#cccccc')
    })
  })

  describe('saturate', () => {
    it('should saturate color', () => {
      const result = saturate('#808080', 20)
      expect(result).toBeTruthy()
    })
  })

  describe('desaturate', () => {
    it('should desaturate color', () => {
      const result = desaturate('#ff0000', 20)
      expect(result).toBeTruthy()
    })
  })

  describe('isDark', () => {
    it('should detect dark colors', () => {
      expect(isDark('#000000')).toBe(true)
      expect(isDark('#ffffff')).toBe(false)
    })
  })

  describe('isLight', () => {
    it('should detect light colors', () => {
      expect(isLight('#ffffff')).toBe(true)
      expect(isLight('#000000')).toBe(false)
    })
  })

  describe('mix', () => {
    it('should mix two colors', () => {
      const result = mix('#ff0000', '#0000ff', 0.5)
      expect(result).toBe('#800080')
    })
  })

  describe('nameToHex', () => {
    it('should convert color names to hex', () => {
      expect(nameToHex('red')).toBe('#FF0000')
      expect(nameToHex('blue')).toBe('#0000FF')
      expect(nameToHex('green')).toBe('#008000')
    })

    it('should return null for unknown names', () => {
      expect(nameToHex('unknown')).toBeNull()
    })
  })
})
