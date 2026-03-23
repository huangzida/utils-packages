export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const camelCase = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

export const pascalCase = (str: string): string => {
  return camelCase(str).replace(/^[a-z]/, (chr) => chr.toUpperCase())
}

export const trim = (str: string, chars?: string): string => {
  if (!chars) return str.trim()
  const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g')
  return str.replace(pattern, '')
}

export const trimStart = (str: string, chars?: string): string => {
  if (!chars) return str.trimStart()
  const pattern = new RegExp(`^[${chars}]+`, 'g')
  return str.replace(pattern, '')
}

export const trimEnd = (str: string, chars?: string): string => {
  if (!chars) return str.trimEnd()
  const pattern = new RegExp(`[${chars}]+$`, 'g')
  return str.replace(pattern, '')
}

export const truncate = (
  str: string,
  length: number,
  suffix: string = '...',
): string => {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

export const padStart = (
  str: string,
  length: number,
  chars: string = ' ',
): string => {
  return str.padStart(length, chars)
}

export const padEnd = (
  str: string,
  length: number,
  chars: string = ' ',
): string => {
  return str.padEnd(length, chars)
}

export const repeat = (str: string, count: number): string => {
  return str.repeat(count)
}

export const reverse = (str: string): string => {
  return str.split('').reverse().join('')
}

export const escapeHtml = (str: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, (chr) => htmlEscapes[chr])
}

export const unescapeHtml = (str: string): string => {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  return str.replace(
    /&(?:amp|lt|gt|quot|#39);/g,
    (entity) => htmlUnescapes[entity] || entity,
  )
}

export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const stripHtml = (str: string): string => {
  return str.replace(/<[^>]*>/g, '')
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const toWords = (str: string): string[] => {
  return str.trim().split(/\s+/)
}

export const toLines = (str: string): string[] => {
  return str.split(/\r?\n/)
}

export const limit = (str: string, length: number, suffix: string = '...'): string => {
  return truncate(str, length, suffix)
}

export const includes = (str: string, search: string, caseSensitive: boolean = true): boolean => {
  return caseSensitive
    ? str.includes(search)
    : str.toLowerCase().includes(search.toLowerCase())
}

export const startsWith = (
  str: string,
  search: string,
  caseSensitive: boolean = true,
): boolean => {
  return caseSensitive
    ? str.startsWith(search)
    : str.toLowerCase().startsWith(search.toLowerCase())
}

export const endsWith = (
  str: string,
  search: string,
  caseSensitive: boolean = true,
): boolean => {
  return caseSensitive
    ? str.endsWith(search)
    : str.toLowerCase().endsWith(search.toLowerCase())
}

export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0
}

export const isNotEmpty = (str: string | null | undefined): boolean => {
  return !isEmpty(str)
}

export const replaceAll = (
  str: string,
  search: string,
  replacement: string,
): string => {
  return str.split(search).join(replacement)
}

export const removeNonPrintable = (str: string): string => {
  return str.replace(/[\x00-\x1F\x7F]/g, '')
}

export const countWords = (str: string): number => {
  return toWords(str).filter((word) => word.length > 0).length
}

export const countLines = (str: string): number => {
  return toLines(str).length
}

export const indent = (str: string, spaces: number = 2): string => {
  const indentStr = ' '.repeat(spaces)
  return toLines(str)
    .map((line) => indentStr + line)
    .join('\n')
}

export const unindent = (str: string): string => {
  const lines = toLines(str)
  const minIndent = Math.min(
    ...lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.match(/^\s*/)?.[0].length || 0),
  )
  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
}

export const template = (
  str: string,
  data: Record<string, any>,
): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return key in data ? String(data[key]) : `{{${key}}}`
  })
}

export const parseQuery = (query: string): Record<string, string> => {
  const params = new URLSearchParams(query)
  const result: Record<string, string> = {}
  params.forEach((value, key) => {
    result[key] = value
  })
  return result
}

export const buildQuery = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}
