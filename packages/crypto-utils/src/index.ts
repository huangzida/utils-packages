import CryptoJS from 'crypto-js'
import {
  CryptoError,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
  type CryptoResult,
} from './types'

export interface AesOptions {
  key: string
  iv: string
}

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

export const createCrypto = (options: AesOptions) => {
  return {
    encrypt: (data: string) => encrypt(data, options),
    decrypt: (word: string) => decrypt(word, options),
  }
}

export {
  CryptoError,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
}
export type { CryptoResult }

export const encodeBase64 = (data: string): string => {
  return CryptoJS.enc.Utf8.parse(data).toString(CryptoJS.enc.Base64)
}

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

export type HashAlgorithm = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512'

export const hash = (data: string, algorithm: HashAlgorithm = 'SHA256'): string => {
  return CryptoJS[algorithm](data).toString()
}

export const md5 = (data: string): string => {
  return hash(data, 'MD5')
}

export const sha1 = (data: string): string => {
  return hash(data, 'SHA1')
}

export const sha256 = (data: string): string => {
  return hash(data, 'SHA256')
}

export const sha512 = (data: string): string => {
  return hash(data, 'SHA512')
}

export interface HmacOptions {
  key: string
  algorithm?: HashAlgorithm
}

export const hmac = (data: string, options: HmacOptions): string => {
  const { key, algorithm = 'SHA256' } = options
  return CryptoJS.HmacSHA256(data, key).toString()
}

export const hmacSHA256 = (data: string, key: string): string => {
  return CryptoJS.HmacSHA256(data, key).toString()
}

export const hmacSHA512 = (data: string, key: string): string => {
  return CryptoJS.HmacSHA512(data, key).toString()
}
