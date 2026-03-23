import { describe, it, expect } from 'vitest'
import {
  encrypt,
  decrypt,
  createCrypto,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
} from '../src/index'

const testKey = 'test-key-16chars'
const testIv = 'test-iv-16-chars'
const testOptions = { key: testKey, iv: testIv }

describe('@zid-utils/crypto-utils', () => {
  describe('encrypt', () => {
    it('should encrypt successfully with valid key and iv', () => {
      const result = encrypt('Hello World', testOptions)
      expect(result.ok).toBe(true)
      expect(result.value).toBeTruthy()
    })

    it('should return error for empty key', () => {
      const result = encrypt('data', { key: '', iv: testIv })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidKeyError)
    })

    it('should return error for invalid key length (short)', () => {
      const result = encrypt('data', { key: 'short', iv: testIv })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidKeyError)
    })

    it('should return error for invalid key length (24 chars)', () => {
      const result = encrypt('data', { key: '123456789012345678901234', iv: testIv })
      expect(result.ok).toBe(true)
    })

    it('should succeed with 24 char key', () => {
      const result = encrypt('data', { key: '123456789012345678901234', iv: testIv })
      expect(result.ok).toBe(true)
    })

    it('should return error for invalid iv length (short)', () => {
      const result = encrypt('data', { key: testKey, iv: 'short' })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidIvError)
    })

    it('should return error for empty iv', () => {
      const result = encrypt('data', { key: testKey, iv: '' })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidIvError)
    })
  })

  describe('decrypt', () => {
    it('should decrypt correctly', () => {
      const encrypted = encrypt('Hello World', testOptions)
      const result = decrypt(encrypted.value!, testOptions)
      expect(result.ok).toBe(true)
      expect(result.value).toBe('Hello World')
    })

    it('should return error for invalid ciphertext', () => {
      const result = decrypt('invalid-ciphertext', testOptions)
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidCiphertextError)
    })

    it('should return error for empty ciphertext', () => {
      const result = decrypt('', testOptions)
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidCiphertextError)
    })

    it('should return error for wrong key', () => {
      const encrypted = encrypt('Secret', { key: testKey, iv: testIv })
      const result = decrypt(encrypted.value!, {
        key: 'xxxx-key-16chars',
        iv: testIv,
      })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidCiphertextError)
    })

    it('should return error for wrong iv', () => {
      const encrypted = encrypt('Secret', { key: testKey, iv: testIv })
      const result = decrypt(encrypted.value!, {
        key: testKey,
        iv: 'different-iv-16c',
      })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidCiphertextError)
    })

    it('should return error for invalid key length', () => {
      const result = decrypt('ciphertext', { key: 'short', iv: testIv })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidKeyError)
    })

    it('should return error for invalid iv length', () => {
      const result = decrypt('ciphertext', { key: testKey, iv: 'short' })
      expect(result.ok).toBe(false)
      expect(result.error).toBeInstanceOf(InvalidIvError)
    })
  })

  describe('createCrypto', () => {
    it('should create crypto instance with pre-configured key and iv', () => {
      const crypto = createCrypto(testOptions)
      const encrypted = crypto.encrypt('Secret Message')
      const decrypted = crypto.decrypt(encrypted.value!)
      expect(decrypted.ok).toBe(true)
      expect(decrypted.value).toBe('Secret Message')
    })

    it('should handle encryption and decryption with different data', () => {
      const crypto = createCrypto(testOptions)

      const data1 = 'First message'
      const data2 = 'Second message'

      const encrypted1 = crypto.encrypt(data1)
      const encrypted2 = crypto.encrypt(data2)

      expect(encrypted1.ok).toBe(true)
      expect(encrypted2.ok).toBe(true)
      expect(encrypted1.value).not.toBe(encrypted2.value)

      const decrypted1 = crypto.decrypt(encrypted1.value!)
      const decrypted2 = crypto.decrypt(encrypted2.value!)

      expect(decrypted1.value).toBe(data1)
      expect(decrypted2.value).toBe(data2)
    })
  })
})
