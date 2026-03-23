export class CryptoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CryptoError'
  }
}

export class InvalidKeyError extends CryptoError {
  constructor() {
    super('Invalid encryption key: must be 16, 24, or 32 characters')
  }
}

export class InvalidIvError extends CryptoError {
  constructor() {
    super('Invalid IV: must be 16 characters')
  }
}

export class InvalidCiphertextError extends CryptoError {
  constructor() {
    super('Invalid ciphertext format')
  }
}

export type CryptoResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: CryptoError }
