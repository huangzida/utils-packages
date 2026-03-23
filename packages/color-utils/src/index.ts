export interface RGB {
  r: number
  g: number
  b: number
}

export interface RGBA extends RGB {
  a: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface HSLA extends HSL {
  a: number
}

export interface HSV {
  h: number
  s: number
  v: number
}

const parseHexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const parseShortHexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1] + result[1], 16),
        g: parseInt(result[2] + result[2], 16),
        b: parseInt(result[3] + result[3], 16),
      }
    : null
}

export const isValidHex = (hex: string): boolean => {
  return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex)
}

export const isValidRgb = (rgb: RGB): boolean => {
  return (
    rgb.r >= 0 &&
    rgb.r <= 255 &&
    rgb.g >= 0 &&
    rgb.g <= 255 &&
    rgb.b >= 0 &&
    rgb.b <= 255
  )
}

export const hexToRgb = (hex: string): RGB | null => {
  if (!isValidHex(hex)) return null

  if (hex.length === 4 || hex.length === 3) {
    return parseShortHexToRgb(hex)
  }

  return parseHexToRgb(hex)
}

export const rgbToHex = (rgb: RGB): string => {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
}

export const rgbToHsl = (rgb: RGB): HSL => {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) }
  }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6
      break
    case g:
      h = ((b - r) / d + 2) / 6
      break
    case b:
      h = ((r - g) / d + 4) / 6
      break
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export const hslToRgb = (hsl: HSL): RGB => {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  if (s === 0) {
    const gray = Math.round(l * 255)
    return { r: gray, g: gray, b: gray }
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  }
}

export const hexToHsl = (hex: string): HSL | null => {
  const rgb = hexToRgb(hex)
  return rgb ? rgbToHsl(rgb) : null
}

export const hslToHex = (hsl: HSL): string => {
  return rgbToHex(hslToRgb(hsl))
}

export const lighten = (color: string, amount: number): string => {
  const hsl = /^#/.test(color) ? hexToHsl(color) : null
  if (!hsl) return color

  return hslToHex({
    h: hsl.h,
    s: hsl.s,
    l: Math.min(100, hsl.l + amount),
  })
}

export const darken = (color: string, amount: number): string => {
  const hsl = /^#/.test(color) ? hexToHsl(color) : null
  if (!hsl) return color

  return hslToHex({
    h: hsl.h,
    s: hsl.s,
    l: Math.max(0, hsl.l - amount),
  })
}

export const saturate = (color: string, amount: number): string => {
  const hsl = /^#/.test(color) ? hexToHsl(color) : null
  if (!hsl) return color

  return hslToHex({
    h: hsl.h,
    s: Math.min(100, hsl.s + amount),
    l: hsl.l,
  })
}

export const desaturate = (color: string, amount: number): string => {
  const hsl = /^#/.test(color) ? hexToHsl(color) : null
  if (!hsl) return color

  return hslToHex({
    h: hsl.h,
    s: Math.max(0, hsl.s - amount),
    l: hsl.l,
  })
}

export const fadeIn = (color: string, amount: number): string => {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, amount)}`
}

export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return 0

  const luminance = (rgb: RGB) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
      const s = c / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const l1 = luminance(rgb1)
  const l2 = luminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

export const isDark = (color: string): boolean => {
  const rgb = hexToRgb(color)
  if (!rgb) return false

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance < 0.5
}

export const isLight = (color: string): boolean => {
  return !isDark(color)
}

export const mix = (color1: string, color2: string, weight: number = 0.5): string => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return color1

  const w = Math.max(0, Math.min(1, weight))

  return rgbToHex({
    r: Math.round(rgb1.r * (1 - w) + rgb2.r * w),
    g: Math.round(rgb1.g * (1 - w) + rgb2.g * w),
    b: Math.round(rgb1.b * (1 - w) + rgb2.b * w),
  })
}

export const randomColor = (): string => {
  return rgbToHex({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  })
}

export const nameToHex = (name: string): string | null => {
  const colors: Record<string, string> = {
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    white: '#FFFFFF',
    black: '#000000',
    yellow: '#FFFF00',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    orange: '#FFA500',
    purple: '#800080',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    gray: '#808080',
    grey: '#808080',
  }

  return colors[name.toLowerCase()] || null
}
