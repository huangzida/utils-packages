# @zid-utils/crypto-utils

> AES 加密解密、哈希计算、Base64 编解码工具库 (AES encryption/decryption, hashing, and Base64 encoding/decoding utilities)

## 安装

```bash
pnpm add @zid-utils/crypto-utils
```

## 概述

提供 AES 加密解密、哈希计算、Base64 编解码等加密功能，适用于数据加密传输、用户密码存储、API 签名验证等场景。

## ⚠️ 安全提示

使用加密功能时请注意：

1. **密钥管理**: key 和 iv 必须都是 16 字符，建议从环境变量读取，不要硬编码在代码中
2. **HTTPS**: 敏感数据传输应使用 HTTPS 加密通道
3. **密钥生成**: 使用 `generateKey()` 和 `generateIv()` 生成安全的随机密钥

## 使用方法

```typescript
import {
  encrypt,
  decrypt,
  createCrypto,
  hash,
  md5,
  sha256,
  encodeBase64,
  decodeBase64,
  generateKey,
  generateIv,
} from "@zid-utils/crypto-utils";

// AES 加密解密
const encrypted = encrypt("Hello World", {
  key: "your-16-char-key",
  iv: "your-16-char-iv",
});

if (encrypted.ok) {
  console.log("加密成功:", encrypted.value);
}

const decrypted = decrypt(encrypted.value, {
  key: "your-16-char-key",
  iv: "your-16-char-iv",
});

if (decrypted.ok) {
  console.log("解密成功:", decrypted.value);
}

// 使用加密实例
const crypto = createCrypto({ key: "your-16-char-key", iv: "your-16-char-iv" });
crypto.encrypt("data");
crypto.decrypt("ciphertext");

// 哈希计算
const sha256Hash = sha256("password");
const md5Hash = md5("data");

// Base64 编解码
const encoded = encodeBase64("Hello");
const decoded = decodeBase64(encoded);
```

## 加密解密函数

### encrypt

AES 加密字符串。

```typescript
function encrypt(
  data: string,
  options: AesOptions
): CryptoResult<string>
```

**参数**:

- `data`: 要加密的字符串
- `options`: 加密配置
  - `key`: 密钥（16/24/32 字符）
  - `iv`: 初始向量（16 字符）

**返回值**: `CryptoResult<string>` 类型

```typescript
type CryptoResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error }
```

**示例**:

```typescript
const result = encrypt("sensitive data", {
  key: "0123456789abcdef",
  iv: "fedcba9876543210",
});

if (result.ok) {
  console.log("加密后:", result.value);
} else {
  console.error("加密失败:", result.error.message);
}
```

### decrypt

AES 解密字符串。

```typescript
function decrypt(
  ciphertext: string,
  options: AesOptions
): CryptoResult<string>
```

**参数**:

- `ciphertext`: 加密后的字符串
- `options`: 解密配置（同 encrypt）

**返回值**: `CryptoResult<string>` 类型

**示例**:

```typescript
const result = decrypt(ciphertext, {
  key: "0123456789abcdef",
  iv: "fedcba9876543210",
});

if (result.ok) {
  console.log("解密后:", result.value);
}
```

### createCrypto

创建可复用的加密解密实例。

```typescript
function createCrypto(options: AesOptions): {
  encrypt: (data: string) => CryptoResult<string>;
  decrypt: (ciphertext: string) => CryptoResult<string>;
}
```

**示例**:

```typescript
const crypto = createCrypto({
  key: "0123456789abcdef",
  iv: "fedcba9876543210",
});

// 多次使用同一个实例
const encrypted1 = crypto.encrypt("data1");
const encrypted2 = crypto.encrypt("data2");
const decrypted = crypto.decrypt(encrypted1.value);
```

## 哈希函数

### hash

计算哈希值。

```typescript
function hash(
  data: string,
  algorithm?: HashAlgorithm
): string
```

**参数**:

- `data`: 要哈希的数据
- `algorithm`: 哈希算法，可选 `"MD5" | "SHA1" | "SHA256" | "SHA512"`，默认 `"SHA256"`

**示例**:

```typescript
const sha256Hash = hash("password"); // SHA256
const md5Hash = hash("password", "MD5"); // MD5
const sha512Hash = hash("password", "SHA512"); // SHA512
```

### md5

计算 MD5 哈希值（不推荐用于安全用途）。

```typescript
function md5(data: string): string
```

### sha1

计算 SHA1 哈希值（不推荐用于安全用途）。

```typescript
function sha1(data: string): string
```

### sha256

计算 SHA256 哈希值（推荐）。

```typescript
function sha256(data: string): string
```

### sha512

计算 SHA512 哈希值（更高安全性）。

```typescript
function sha512(data: string): string
```

## HMAC 函数

### hmac

计算 HMAC。

```typescript
function hmac(
  data: string,
  options: HmacOptions
): string
```

**参数**:

- `data`: 要计算 HMAC 的数据
- `options`: HMAC 配置
  - `key`: 密钥
  - `algorithm`: 算法类型

**示例**:

```typescript
const hmacValue = hmac("data", {
  key: "secret-key",
  algorithm: "SHA256",
});
```

### hmacSHA256

计算 HMAC-SHA256。

```typescript
function hmacSHA256(data: string, key: string): string
```

### hmacSHA512

计算 HMAC-SHA512。

```typescript
function hmacSHA512(data: string, key: string): string
```

## Base64 函数

### encodeBase64

Base64 编码。

```typescript
function encodeBase64(data: string): string
```

**示例**:

```typescript
const encoded = encodeBase64("Hello World");
// "SGVsbG8gV29ybGQ="
```

### decodeBase64

Base64 解码。

```typescript
function decodeBase64(data: string): CryptoResult<string>
```

**示例**:

```typescript
const result = decodeBase64("SGVsbG8gV29ybGQ=");

if (result.ok) {
  console.log(result.value); // "Hello World"
}
```

## 密钥生成函数

### generateKey

生成随机密钥。

```typescript
function generateKey(length?: KeyLength): string
```

**参数**:

- `length`: 密钥长度，可选 `16 | 24 | 32`，默认 `32`

**示例**:

```typescript
const key = generateKey(16); // 16 字符密钥
const key = generateKey(24); // 24 字符密钥
const key = generateKey(32); // 32 字符密钥
```

### generateIv

生成随机 IV。

```typescript
function generateIv(): string
```

**返回值**: 16 字符的随机 IV

**示例**:

```typescript
const iv = generateIv(); // 例如: "a1b2c3d4e5f6g7h8"
```

### generateKeyIvPair

生成密钥和 IV 对。

```typescript
function generateKeyIvPair(keyLength?: KeyLength): {
  key: string;
  iv: string;
}
```

**示例**:

```typescript
const { key, iv } = generateKeyIvPair(16);
// { key: "abc123def456ghi7", iv: "hgfedcba98765432" }
```

## 错误类型

```typescript
class CryptoError extends Error {}
class InvalidKeyError extends CryptoError {}
class InvalidIvError extends CryptoError {}
class InvalidCiphertextError extends CryptoError {}
```

## 实际应用示例

### 用户密码加密存储

```typescript
import { sha256, hash } from "@zid-utils/crypto-utils";

function hashPassword(password: string): string {
  const salt = generateKey(16);
  const hashedPassword = sha256(password + salt);
  return `${salt}:${hashedPassword}`;
}

function verifyPassword(
  password: string,
  storedHash: string
): boolean {
  const [salt, hash] = storedHash.split(":");
  const newHash = sha256(password + salt);
  return newHash === hash;
}
```

### API 签名验证

```typescript
import { hmacSHA256, encodeBase64 } from "@zid-utils/crypto-utils";

function generateApiSignature(
  payload: string,
  secretKey: string
): string {
  const signature = hmacSHA256(payload, secretKey);
  return encodeBase64(signature);
}

function verifyApiSignature(
  payload: string,
  signature: string,
  secretKey: string
): boolean {
  const expectedSignature = generateApiSignature(payload, secretKey);
  return signature === expectedSignature;
}

// 使用
const payload = JSON.stringify({ userId: 123, action: "login" });
const signature = generateApiSignature(payload, "your-secret-key");
```

### 敏感数据加密传输

```typescript
import { encrypt, decrypt, generateKeyIvPair } from "@zid-utils/crypto-utils";

interface EncryptedMessage {
  ciphertext: string;
  key: string;
  iv: string;
}

function encryptMessage(data: string): EncryptedMessage {
  const { key, iv } = generateKeyIvPair(16);
  const encrypted = encrypt(data, { key, iv });

  if (!encrypted.ok) {
    throw new Error("Encryption failed");
  }

  return {
    ciphertext: encrypted.value,
    key,
    iv,
  };
}

function decryptMessage(message: EncryptedMessage): string {
  const decrypted = decrypt(message.ciphertext, {
    key: message.key,
    iv: message.iv,
  });

  if (!decrypted.ok) {
    throw new Error("Decryption failed");
  }

  return decrypted.value;
}
```

### Token 生成

```typescript
import { sha256, encodeBase64 } from "@zid-utils/crypto-utils";

function generateToken(data: object): string {
  const payload = JSON.stringify(data);
  const hash = sha256(payload);
  const encoded = encodeBase64(hash);
  return encoded.replace(/[/+=]/g, "").substring(0, 32);
}

// 使用
const token = generateToken({
  userId: 123,
  exp: Date.now() + 3600000,
});
```

## 安全最佳实践

1. **密钥长度**: 使用 32 字符的密钥以获得最高的 AES-256 加密强度
2. **IV 重用**: 每次加密都应使用新的 IV
3. **密钥存储**: 永远不要在前端代码中硬编码密钥，使用环境变量或安全的密钥管理服务
4. **HTTPS**: 所有加密数据传输都应通过 HTTPS 通道
5. **哈希算法**: MD5 和 SHA1 因存在碰撞攻击风险，不应用于安全敏感场景

## License

MIT
