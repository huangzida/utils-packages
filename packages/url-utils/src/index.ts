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

export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

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

export const getParam = (url: string, key: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get(key)
  } catch {
    return null
  }
}

export const setParam = (
  url: string,
  key: string,
  value: string,
): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.set(key, value)
  return urlObj.toString()
}

export const deleteParam = (url: string, key: string): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.delete(key)
  return urlObj.toString()
}

export const getHash = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hash
  } catch {
    return ''
  }
}

export const setHash = (url: string, hash: string): string => {
  const urlObj = new URL(url)
  urlObj.hash = hash
  return urlObj.toString()
}

export const isAbsoluteUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export const isRelativeUrl = (url: string): boolean => {
  return !isAbsoluteUrl(url)
}

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

export const extractDomain = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

export const extractPath = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    return null
  }
}

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

export const hasParam = (url: string, key: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.has(key)
  } catch {
    return false
  }
}

export const removeTrailingSlash = (url: string): string => {
  return url.replace(/\/+$/, '')
}

export const addTrailingSlash = (url: string): string => {
  return url.replace(/\/+$/, '') + '/'
}
