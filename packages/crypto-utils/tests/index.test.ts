import { describe, it, expect } from "vitest";
import {
  encrypt,
  decrypt,
  createCrypto,
  encodeBase64,
  decodeBase64,
  hash,
  md5,
  sha1,
  sha256,
  sha512,
  hmac,
  hmacSHA256,
  hmacSHA512,
  generateKey,
  generateIv,
  generateKeyIvPair,
  InvalidKeyError,
  InvalidIvError,
  InvalidCiphertextError,
} from "../src/index";

const testKey = "test-key-16chars";
const testIv = "test-iv-16-chars";
const testOptions = { key: testKey, iv: testIv };

describe("@zid-utils/crypto-utils", () => {
  describe("encrypt", () => {
    it("should encrypt successfully with valid key and iv", () => {
      const result = encrypt("Hello World", testOptions);
      if (!result.ok) throw new Error("Expected success");
      expect(result.value).toBeTruthy();
    });

    it("should return error for empty key", () => {
      const result = encrypt("data", { key: "", iv: testIv });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidKeyError);
    });

    it("should return error for invalid key length (short)", () => {
      const result = encrypt("data", { key: "short", iv: testIv });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidKeyError);
    });

    it("should return error for invalid key length (24 chars)", () => {
      const result = encrypt("data", {
        key: "123456789012345678901234",
        iv: testIv,
      });
      expect(result.ok).toBe(true);
    });

    it("should succeed with 24 char key", () => {
      const result = encrypt("data", {
        key: "123456789012345678901234",
        iv: testIv,
      });
      expect(result.ok).toBe(true);
    });

    it("should return error for invalid iv length (short)", () => {
      const result = encrypt("data", { key: testKey, iv: "short" });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidIvError);
    });

    it("should return error for empty iv", () => {
      const result = encrypt("data", { key: testKey, iv: "" });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidIvError);
    });
  });

  describe("decrypt", () => {
    it("should decrypt correctly", () => {
      const encrypted = encrypt("Hello World", testOptions);
      if (!encrypted.ok) throw new Error("Expected encrypt success");
      const result = decrypt(encrypted.value, testOptions);
      if (!result.ok) throw new Error("Expected decrypt success");
      expect(result.value).toBe("Hello World");
    });

    it("should return error for invalid ciphertext", () => {
      const result = decrypt("invalid-ciphertext", testOptions);
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidCiphertextError);
    });

    it("should return error for empty ciphertext", () => {
      const result = decrypt("", testOptions);
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidCiphertextError);
    });

    it("should return error for wrong key", () => {
      const encrypted = encrypt("Secret", { key: testKey, iv: testIv });
      if (!encrypted.ok) throw new Error("Expected encrypt success");
      const result = decrypt(encrypted.value, {
        key: "xxxx-key-16chars",
        iv: testIv,
      });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidCiphertextError);
    });

    it("should return error for wrong iv", () => {
      const encrypted = encrypt("Secret", { key: testKey, iv: testIv });
      if (!encrypted.ok) throw new Error("Expected encrypt success");
      const result = decrypt(encrypted.value, {
        key: testKey,
        iv: "different-iv-16c",
      });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidCiphertextError);
    });

    it("should return error for invalid key length", () => {
      const result = decrypt("ciphertext", { key: "short", iv: testIv });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidKeyError);
    });

    it("should return error for invalid iv length", () => {
      const result = decrypt("ciphertext", { key: testKey, iv: "short" });
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidIvError);
    });
  });

  describe("createCrypto", () => {
    it("should create crypto instance with pre-configured key and iv", () => {
      const crypto = createCrypto(testOptions);
      const encrypted = crypto.encrypt("Secret Message");
      if (!encrypted.ok) throw new Error("Expected encrypt success");
      const decrypted = crypto.decrypt(encrypted.value);
      if (!decrypted.ok) throw new Error("Expected decrypt success");
      expect(decrypted.value).toBe("Secret Message");
    });

    it("should handle encryption and decryption with different data", () => {
      const crypto = createCrypto(testOptions);

      const data1 = "First message";
      const data2 = "Second message";

      const encrypted1 = crypto.encrypt(data1);
      const encrypted2 = crypto.encrypt(data2);

      if (!encrypted1.ok) throw new Error("Expected encrypt success");
      if (!encrypted2.ok) throw new Error("Expected encrypt success");
      expect(encrypted1.value).not.toBe(encrypted2.value);

      const decrypted1 = crypto.decrypt(encrypted1.value);
      const decrypted2 = crypto.decrypt(encrypted2.value);

      if (!decrypted1.ok) throw new Error("Expected decrypt success");
      if (!decrypted2.ok) throw new Error("Expected decrypt success");
      expect(decrypted1.value).toBe(data1);
      expect(decrypted2.value).toBe(data2);
    });
  });

  describe("Base64 encoding/decoding", () => {
    it("should encode string to base64", () => {
      const encoded = encodeBase64("Hello World");
      expect(encoded).toBe("SGVsbG8gV29ybGQ=");
    });

    it("should encode empty string", () => {
      const encoded = encodeBase64("");
      expect(encoded).toBe("");
    });

    it("should encode special characters", () => {
      const encoded = encodeBase64("你好世界");
      expect(encoded).toBeTruthy();
    });

    it("should decode base64 string correctly", () => {
      const result = decodeBase64("SGVsbG8gV29ybGQ=");
      if (!result.ok) throw new Error("Expected success");
      expect(result.value).toBe("Hello World");
    });

    it("should return error for invalid base64", () => {
      const result = decodeBase64("not-valid-base64!!!");
      if (result.ok) throw new Error("Expected failure");
      expect(result.error).toBeInstanceOf(InvalidCiphertextError);
    });

    it("should encode and decode roundtrip", () => {
      const original = "Test String 123!@#";
      const encoded = encodeBase64(original);
      const decoded = decodeBase64(encoded);
      if (!decoded.ok) throw new Error("Expected success");
      expect(decoded.value).toBe(original);
    });
  });

  describe("hash functions", () => {
    it("should generate consistent MD5 hash", () => {
      const hash1 = md5("hello");
      const hash2 = md5("hello");
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(32);
    });

    it("should generate consistent SHA1 hash", () => {
      const hash1 = sha1("hello");
      const hash2 = sha1("hello");
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(40);
    });

    it("should generate consistent SHA256 hash", () => {
      const hash1 = sha256("hello");
      const hash2 = sha256("hello");
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64);
    });

    it("should generate consistent SHA512 hash", () => {
      const hash1 = sha512("hello");
      const hash2 = sha512("hello");
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(128);
    });

    it("should generate different hashes for different inputs", () => {
      const hash1 = sha256("hello");
      const hash2 = sha256("world");
      expect(hash1).not.toBe(hash2);
    });

    it("should use default SHA256 in hash function", () => {
      const hashResult = hash("hello");
      const sha256Result = sha256("hello");
      expect(hashResult).toBe(sha256Result);
    });

    it("should support custom algorithm in hash function", () => {
      const md5Result = hash("hello", "MD5");
      const sha1Result = hash("hello", "SHA1");
      expect(md5Result).toBe(md5("hello"));
      expect(sha1Result).toBe(sha1("hello"));
    });
  });

  describe("HMAC functions", () => {
    it("should generate consistent HMAC-SHA256", () => {
      const hmac1 = hmacSHA256("hello", "secret");
      const hmac2 = hmacSHA256("hello", "secret");
      expect(hmac1).toBe(hmac2);
      expect(hmac1).toHaveLength(64);
    });

    it("should generate different HMAC with different keys", () => {
      const hmac1 = hmacSHA256("hello", "secret1");
      const hmac2 = hmacSHA256("hello", "secret2");
      expect(hmac1).not.toBe(hmac2);
    });

    it("should generate different HMAC with different data", () => {
      const hmac1 = hmacSHA256("hello", "secret");
      const hmac2 = hmacSHA256("world", "secret");
      expect(hmac1).not.toBe(hmac2);
    });

    it("should generate consistent HMAC-SHA512", () => {
      const hmac1 = hmacSHA512("hello", "secret");
      const hmac2 = hmacSHA512("hello", "secret");
      expect(hmac1).toBe(hmac2);
      expect(hmac1).toHaveLength(128);
    });

    it("should support custom options in hmac function", () => {
      const hmacResult = hmac("hello", { key: "secret" });
      const hmacSHA256Result = hmacSHA256("hello", "secret");
      expect(hmacResult).toBe(hmacSHA256Result);
    });
  });

  describe("key generation", () => {
    it("should generate 16-char key by default", () => {
      const key = generateKey();
      expect(key).toHaveLength(16);
    });

    it("should generate 24-char key", () => {
      const key = generateKey(24);
      expect(key).toHaveLength(24);
    });

    it("should generate 32-char key", () => {
      const key = generateKey(32);
      expect(key).toHaveLength(32);
    });

    it("should generate unique keys", () => {
      const key1 = generateKey();
      const key2 = generateKey();
      expect(key1).not.toBe(key2);
    });

    it("should generate 16-char IV", () => {
      const iv = generateIv();
      expect(iv).toHaveLength(16);
    });

    it("should generate unique IVs", () => {
      const iv1 = generateIv();
      const iv2 = generateIv();
      expect(iv1).not.toBe(iv2);
    });

    it("should generate key/IV pair", () => {
      const { key, iv } = generateKeyIvPair();
      expect(key).toHaveLength(16);
      expect(iv).toHaveLength(16);
    });

    it("should generate valid key/IV pair for encryption", () => {
      const { key, iv } = generateKeyIvPair();
      const result = encrypt("test message", { key, iv });
      expect(result.ok).toBe(true);
    });
  });
});
