import CryptoJS from 'crypto-js'
import {
  CryptoError,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
  type CryptoResult,
} from './types'

/**
 * AES 加密解密选项
 */
export interface AesOptions {
  /** 密钥（16/24/32 字符）*/
  key: string
  /** 初始向量（16 字符）*/
  iv: string
}

/**
 * 解密字符串
 * @param word - 待解密的密文
 * @param options - AES 选项（密钥和 IV）
 * @returns 解密结果
 */
export const decrypt = (
  word: string,
  options: AesOptions,
): CryptoResult<string> => {
  const { key, iv } = options

  if (!key || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
    return { ok: false, error: new InvalidKeyError() }
  }

  if (!iv || iv.length !== 16) {
    return { ok: false, error: new InvalidIvError() }
  }

  try {
    const keyParsed = CryptoJS.enc.Utf8.parse(key)
    const ivParsed = CryptoJS.enc.Utf8.parse(iv)
    const decrypted = CryptoJS.AES.decrypt(word, keyParsed, {
      iv: ivParsed,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const result = decrypted.toString(CryptoJS.enc.Utf8)

    if (!result) {
      return { ok: false, error: new InvalidCiphertextError() }
    }

    return { ok: true, value: result }
  } catch {
    return { ok: false, error: new InvalidCiphertextError() }
  }
}

/**
 * 加密字符串
 * @param data - 待加密的明文
 * @param options - AES 选项（密钥和 IV）
 * @returns 加密结果
 */
export const encrypt = (
  data: string,
  options: AesOptions,
): CryptoResult<string> => {
  const { key, iv } = options

  if (!key || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
    return { ok: false, error: new InvalidKeyError() }
  }

  if (!iv || iv.length !== 16) {
    return { ok: false, error: new InvalidIvError() }
  }

  const keyParsed = CryptoJS.enc.Utf8.parse(key)
  const ivParsed = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(data, keyParsed, {
    iv: ivParsed,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return { ok: true, value: encrypted.toString() }
}

/**
 * 创建可复用的加密解密实例
 * @param options - AES 选项（密钥和 IV）
 * @returns 包含 encrypt 和 decrypt 方法的对象
 */
export const createCrypto = (options: AesOptions) => {
  return {
    encrypt: (data: string) => encrypt(data, options),
    decrypt: (word: string) => decrypt(word, options),
  }
}

/**
 * 加密解密错误类型
 */
export {
  CryptoError,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
}
export type { CryptoResult }

/**
 * Base64 编码
 * @param data - 待编码的字符串
 * @returns Base64 编码字符串
 */
export const encodeBase64 = (data: string): string => {
  return CryptoJS.enc.Utf8.parse(data).toString(CryptoJS.enc.Base64)
}

/**
 * Base64 解码
 * @param data - Base64 字符串
 * @returns 解码结果
 */
export const decodeBase64 = (data: string): CryptoResult<string> => {
  try {
    const decoded = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
    if (!decoded) {
      return { ok: false, error: new InvalidCiphertextError() }
    }
    return { ok: true, value: decoded }
  } catch {
    return { ok: false, error: new InvalidCiphertextError() }
  }
}

/**
 * 哈希算法类型
 */
export type HashAlgorithm = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512'

/**
 * 计算字符串哈希值
 * @param data - 待哈希的数据
 * @param algorithm - 哈希算法（默认 SHA256）
 * @returns 哈希值的十六进制字符串
 */
export const hash = (data: string, algorithm: HashAlgorithm = 'SHA256'): string => {
  return CryptoJS[algorithm](data).toString()
}

/**
 * 计算 MD5 哈希
 * @param data - 待哈希的数据
 * @returns MD5 哈希值
 */
export const md5 = (data: string): string => {
  return hash(data, 'MD5')
}

/**
 * 计算 SHA1 哈希
 * @param data - 待哈希的数据
 * @returns SHA1 哈希值
 */
export const sha1 = (data: string): string => {
  return hash(data, 'SHA1')
}

/**
 * 计算 SHA256 哈希
 * @param data - 待哈希的数据
 * @returns SHA256 哈希值
 */
export const sha256 = (data: string): string => {
  return hash(data, 'SHA256')
}

/**
 * 计算 SHA512 哈希
 * @param data - 待哈希的数据
 * @returns SHA512 哈希值
 */
export const sha512 = (data: string): string => {
  return hash(data, 'SHA512')
}

/**
 * HMAC 选项
 */
export interface HmacOptions {
  /** 密钥 */
  key: string
  /** 算法（默认 SHA256）*/
  algorithm?: HashAlgorithm
}

/**
 * 计算 HMAC 哈希（默认使用 SHA256）
 * @param data - 待哈希的数据
 * @param options - HMAC 选项
 * @returns HMAC 哈希值
 */
export const hmac = (data: string, options: HmacOptions): string => {
  const { key } = options
  return CryptoJS.HmacSHA256(data, key).toString()
}

/**
 * 计算 HMAC-SHA256
 * @param data - 待哈希的数据
 * @param key - 密钥
 * @returns HMAC-SHA256 哈希值
 */
export const hmacSHA256 = (data: string, key: string): string => {
  return CryptoJS.HmacSHA256(data, key).toString()
}

/**
 * 计算 HMAC-SHA512
 * @param data - 待哈希的数据
 * @param key - 密钥
 * @returns HMAC-SHA512 哈希值
 */
export const hmacSHA512 = (data: string, key: string): string => {
  return CryptoJS.HmacSHA512(data, key).toString()
}

/**
 * 密钥长度类型
 */
export type KeyLength = 16 | 24 | 32

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateRandomString = (length: number): string => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((byte) => CHARSET[byte % CHARSET.length])
    .join('')
}

/**
 * 生成随机密钥
 * @param length - 密钥长度（默认 16）
 * @returns 随机密钥字符串
 */
export const generateKey = (length: KeyLength = 16): string => {
  return generateRandomString(length)
}

/**
 * 生成随机 IV
 * @returns 16 字符的随机 IV
 */
export const generateIv = (): string => {
  return generateRandomString(16)
}

/**
 * 生成密钥和 IV 对
 * @param keyLength - 密钥长度（默认 16）
 * @returns 包含 key 和 iv 的对象
 */
export const generateKeyIvPair = (keyLength: KeyLength = 16): { key: string; iv: string } => {
  return {
    key: generateKey(keyLength),
    iv: generateIv(),
  }
}
