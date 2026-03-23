import CryptoJS from 'crypto-js'

export interface AesOptions {
  key: string
  iv: string
}

export const decrypt = (word: string, options: AesOptions): string => {
  const { key, iv } = options
  try {
    const keyParsed = CryptoJS.enc.Utf8.parse(key)
    const ivParsed = CryptoJS.enc.Utf8.parse(iv)
    const decrypted = CryptoJS.AES.decrypt(word, keyParsed, {
      iv: ivParsed,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch {
    return ''
  }
}

export const encrypt = (data: string, options: AesOptions): string => {
  const { key, iv } = options
  const keyParsed = CryptoJS.enc.Utf8.parse(key)
  const ivParsed = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(data, keyParsed, {
    iv: ivParsed,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

export const createCrypto = (options: AesOptions) => {
  return {
    encrypt: (data: string) => encrypt(data, options),
    decrypt: (word: string) => decrypt(word, options),
  }
}
