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
