/**
 * URL 各部分接口
 */
export interface UrlParts {
  protocol?: string
  hostname?: string
  port?: string
  pathname?: string
  search?: string
  hash?: string
  username?: string
  password?: string
  origin?: string
}

/**
 * 解析 URL 字符串
 * @param url - URL 字符串
 * @returns URL 对象，解析失败返回 null
 */
export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

/**
 * 构建带参数的 URL
 * @param base - 基础 URL
 * @param params - 查询参数对象
 * @returns 构建后的 URL 字符串
 */
export const buildUrl = (
  base: string,
  params?: Record<string, string | number | boolean>,
): string => {
  const url = new URL(base)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }
  return url.toString()
}

/**
 * 获取 URL 中的单个参数
 * @param url - URL 字符串
 * @param key - 参数名
 * @returns 参数值，不存在返回 null
 */
export const getParam = (url: string, key: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get(key)
  } catch {
    return null
  }
}

/**
 * 设置 URL 中的参数
 * @param url - URL 字符串
 * @param key - 参数名
 * @param value - 参数值
 * @returns 设置后的 URL 字符串
 */
export const setParam = (
  url: string,
  key: string,
  value: string,
): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.set(key, value)
  return urlObj.toString()
}

/**
 * 删除 URL 中的参数
 * @param url - URL 字符串
 * @param key - 参数名
 * @returns 删除后的 URL 字符串
 */
export const deleteParam = (url: string, key: string): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.delete(key)
  return urlObj.toString()
}

/**
 * 获取 URL 中的 hash
 * @param url - URL 字符串
 * @returns hash 值（包括 # 号）
 */
export const getHash = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hash
  } catch {
    return ''
  }
}

/**
 * 设置 URL 中的 hash
 * @param url - URL 字符串
 * @param hash - hash 值
 * @returns 设置后的 URL 字符串
 */
export const setHash = (url: string, hash: string): string => {
  const urlObj = new URL(url)
  urlObj.hash = hash
  return urlObj.toString()
}

/**
 * 检查是否为绝对 URL
 * @param url - URL 字符串
 * @returns 是否为绝对 URL
 */
export const isAbsoluteUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * 检查是否为相对 URL
 * @param url - URL 字符串
 * @returns 是否为相对 URL
 */
export const isRelativeUrl = (url: string): boolean => {
  return !isAbsoluteUrl(url)
}

/**
 * 连接 URL 路径部分
 * @param parts - URL 路径部分
 * @returns 拼接后的 URL 字符串
 */
export const joinUrl = (...parts: string[]): string => {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/+$/, '')
      if (i === parts.length - 1) return part.replace(/^\/+/, '')
      return part.replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)
    .join('/')
}

/**
 * 提取 URL 的域名
 * @param url - URL 字符串
 * @returns 域名，解析失败返回 null
 */
export const extractDomain = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

/**
 * 提取 URL 的路径
 * @param url - URL 字符串
 * @returns 路径，解析失败返回 null
 */
export const extractPath = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    return null
  }
}

/**
 * 获取 URL 中的所有参数
 * @param url - URL 字符串
 * @returns 参数对象
 */
export const getAllParams = (url: string): Record<string, string> => {
  try {
    const urlObj = new URL(url)
    const result: Record<string, string> = {}
    urlObj.searchParams.forEach((value, key) => {
      result[key] = value
    })
    return result
  } catch {
    return {}
  }
}

/**
 * 检查 URL 是否包含指定参数
 * @param url - URL 字符串
 * @param key - 参数名
 * @returns 是否包含该参数
 */
export const hasParam = (url: string, key: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.has(key)
  } catch {
    return false
  }
}

/**
 * 移除 URL 末尾的斜杠
 * @param url - URL 字符串
 * @returns 移除末尾斜杠后的 URL
 */
export const removeTrailingSlash = (url: string): string => {
  return url.replace(/\/+$/, '')
}

/**
 * 添加 URL 末尾的斜杠
 * @param url - URL 字符串
 * @returns 添加末尾斜杠后的 URL
 */
export const addTrailingSlash = (url: string): string => {
  return url.replace(/\/+$/, '') + '/'
}
