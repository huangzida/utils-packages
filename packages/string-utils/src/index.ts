/**
 * 将字符串首字母大写
 * @param str - 输入字符串
 * @returns 首字母大写的字符串
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 转换为驼峰命名（camelCase）
 * @param str - 输入字符串
 * @returns 驼峰命名字符串
 */
export const camelCase = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

/**
 * 转换为短横线命名（kebab-case）
 * @param str - 输入字符串
 * @returns 短横线命名字符串
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * 转换为下划线命名（snake_case）
 * @param str - 输入字符串
 * @returns 下划线命名字符串
 */
export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

/**
 * 转换为帕斯卡命名（PascalCase）
 * @param str - 输入字符串
 * @returns 帕斯卡命名字符串
 */
export const pascalCase = (str: string): string => {
  return camelCase(str).replace(/^[a-z]/, (chr) => chr.toUpperCase())
}

/**
 * 去除字符串首尾空白
 * @param str - 输入字符串
 * @param chars - 可选的自定义去除字符
 * @returns 去除空白后的字符串
 */
export const trim = (str: string, chars?: string): string => {
  if (!chars) return str.trim()
  const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g')
  return str.replace(pattern, '')
}

/**
 * 去除字符串开头空白
 * @param str - 输入字符串
 * @param chars - 可选的自定义去除字符
 * @returns 去除开头空白后的字符串
 */
export const trimStart = (str: string, chars?: string): string => {
  if (!chars) return str.trimStart()
  const pattern = new RegExp(`^[${chars}]+`, 'g')
  return str.replace(pattern, '')
}

/**
 * 去除字符串结尾空白
 * @param str - 输入字符串
 * @param chars - 可选的自定义去除字符
 * @returns 去除结尾空白后的字符串
 */
export const trimEnd = (str: string, chars?: string): string => {
  if (!chars) return str.trimEnd()
  const pattern = new RegExp(`[${chars}]+$`, 'g')
  return str.replace(pattern, '')
}

/**
 * 截断字符串并添加后缀
 * @param str - 输入字符串
 * @param length - 最大长度
 * @param suffix - 后缀（默认...）
 * @returns 截断后的字符串
 */
export const truncate = (
  str: string,
  length: number,
  suffix: string = '...',
): string => {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

/**
 * 在字符串开头填充字符
 * @param str - 输入字符串
 * @param length - 目标长度
 * @param chars - 填充字符（默认空格）
 * @returns 填充后的字符串
 */
export const padStart = (
  str: string,
  length: number,
  chars: string = ' ',
): string => {
  return str.padStart(length, chars)
}

/**
 * 在字符串结尾填充字符
 * @param str - 输入字符串
 * @param length - 目标长度
 * @param chars - 填充字符（默认空格）
 * @returns 填充后的字符串
 */
export const padEnd = (
  str: string,
  length: number,
  chars: string = ' ',
): string => {
  return str.padEnd(length, chars)
}

/**
 * 重复字符串指定次数
 * @param str - 输入字符串
 * @param count - 重复次数
 * @returns 重复后的字符串
 */
export const repeat = (str: string, count: number): string => {
  return str.repeat(count)
}

/**
 * 反转字符串
 * @param str - 输入字符串
 * @returns 反转后的字符串
 */
export const reverse = (str: string): string => {
  return str.split('').reverse().join('')
}

/**
 * 转义 HTML 特殊字符
 * @param str - 输入字符串
 * @returns 转义后的字符串
 */
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

/**
 * 反转义 HTML 特殊字符
 * @param str - 输入字符串
 * @returns 反转义后的字符串
 */
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

/**
 * 转义正则表达式特殊字符
 * @param str - 输入字符串
 * @returns 转义后的字符串
 */
export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 移除 HTML 标签
 * @param str - 包含 HTML 标签的字符串
 * @returns 移除标签后的字符串
 */
export const stripHtml = (str: string): string => {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * 转换为 URL 友好的 slug
 * @param str - 输入字符串
 * @returns slug 格式字符串
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 将字符串拆分为单词数组
 * @param str - 输入字符串
 * @returns 单词数组
 */
export const toWords = (str: string): string[] => {
  return str.trim().split(/\s+/)
}

/**
 * 将字符串按行拆分
 * @param str - 输入字符串
 * @returns 行数组
 */
export const toLines = (str: string): string[] => {
  return str.split(/\r?\n/)
}

/**
 * 截断字符串的别名
 * @param str - 输入字符串
 * @param length - 最大长度
 * @param suffix - 后缀
 * @returns 截断后的字符串
 */
export const limit = (str: string, length: number, suffix: string = '...'): string => {
  return truncate(str, length, suffix)
}

/**
 * 检查字符串是否包含子串
 * @param str - 主字符串
 * @param search - 要搜索的子串
 * @param caseSensitive - 是否区分大小写
 * @returns 是否包含
 */
export const includes = (str: string, search: string, caseSensitive: boolean = true): boolean => {
  return caseSensitive
    ? str.includes(search)
    : str.toLowerCase().includes(search.toLowerCase())
}

/**
 * 检查字符串是否以指定子串开头
 * @param str - 主字符串
 * @param search - 要搜索的子串
 * @param caseSensitive - 是否区分大小写
 * @returns 是否以子串开头
 */
export const startsWith = (
  str: string,
  search: string,
  caseSensitive: boolean = true,
): boolean => {
  return caseSensitive
    ? str.startsWith(search)
    : str.toLowerCase().startsWith(search.toLowerCase())
}

/**
 * 检查字符串是否以指定子串结尾
 * @param str - 主字符串
 * @param search - 要搜索的子串
 * @param caseSensitive - 是否区分大小写
 * @returns 是否以子串结尾
 */
export const endsWith = (
  str: string,
  search: string,
  caseSensitive: boolean = true,
): boolean => {
  return caseSensitive
    ? str.endsWith(search)
    : str.toLowerCase().endsWith(search.toLowerCase())
}

/**
 * 检查字符串是否为空
 * @param str - 输入字符串
 * @returns 是否为空
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0
}

/**
 * 检查字符串是否非空
 * @param str - 输入字符串
 * @returns 是否非空
 */
export const isNotEmpty = (str: string | null | undefined): boolean => {
  return !isEmpty(str)
}

/**
 * 替换所有匹配的子串
 * @param str - 主字符串
 * @param search - 要替换的子串
 * @param replacement - 替换为的字符串
 * @returns 替换后的字符串
 */
export const replaceAll = (
  str: string,
  search: string,
  replacement: string,
): string => {
  return str.split(search).join(replacement)
}

/**
 * 移除不可打印字符
 * @param str - 输入字符串
 * @returns 移除不可打印字符后的字符串
 */
export const removeNonPrintable = (str: string): string => {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\x00-\x1F\x7F]/g, '')
}

/**
 * 统计单词数量
 * @param str - 输入字符串
 * @returns 单词数量
 */
export const countWords = (str: string): number => {
  return toWords(str).filter((word) => word.length > 0).length
}

/**
 * 统计行数
 * @param str - 输入字符串
 * @returns 行数
 */
export const countLines = (str: string): number => {
  return toLines(str).length
}

/**
 * 为每行添加缩进
 * @param str - 输入字符串
 * @param spaces - 缩进空格数（默认2）
 * @returns 添加缩进后的字符串
 */
export const indent = (str: string, spaces: number = 2): string => {
  const indentStr = ' '.repeat(spaces)
  return toLines(str)
    .map((line) => indentStr + line)
    .join('\n')
}

/**
 * 移除公共缩进
 * @param str - 输入字符串
 * @returns 移除缩进后的字符串
 */
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

/**
 * 替换模板变量 {{variable}}
 * @param str - 模板字符串
 * @param data - 变量数据对象
 * @returns 替换后的字符串
 */
export const template = (
  str: string,
  data: Record<string, any>,
): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return key in data ? String(data[key]) : `{{${key}}}`
  })
}


