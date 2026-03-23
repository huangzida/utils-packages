import { describe, it, expect } from 'vitest'
import { encrypt, decrypt, createCrypto } from '../src/index'

const testKey = 'test-key-16chars'
const testIv = 'test-iv-16chars'
const testOptions = { key: testKey, iv: testIv }

describe('@zid-utils/crypto-utils', () => {
  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt correctly', () => {
      const original = 'Hello World'
      const encrypted = encrypt(original, testOptions)
      const decrypted = decrypt(encrypted, testOptions)
      expect(decrypted).toBe(original)
    })

    it('should produce consistent ciphertext for same plaintext (AES-CBC is deterministic)', () => {
      const original = 'Test'
      const encrypted1 = encrypt(original, testOptions)
      const encrypted2 = encrypt(original, testOptions)
      expect(encrypted1).toBe(encrypted2)
    })

    it('should return empty string for invalid ciphertext', () => {
      const result = decrypt('invalid-ciphertext', testOptions)
      expect(result).toBe('')
    })
  })

  describe('createCrypto', () => {
    it('should create crypto instance with pre-configured key and iv', () => {
      const crypto = createCrypto(testOptions)
      const original = 'Secret Message'
      const encrypted = crypto.encrypt(original)
      const decrypted = crypto.decrypt(encrypted)
      expect(decrypted).toBe(original)
    })
  })
})
