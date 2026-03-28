# Utils-Packages 优化与扩展实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 删除冗余函数，新增 fn-utils、async-utils、type-utils 三个工具包

**Architecture:** 保持 monorepo 结构，每个工具独立成包。新增的包采用纯函数实现，无外部依赖。

**Tech Stack:** TypeScript + Vitest + tsup + Changesets

---

## 文件结构概览

```
packages/
├── fn-utils/           # 新增
│   ├── src/index.ts
│   ├── tests/index.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── async-utils/        # 新增
│   ├── src/index.ts
│   ├── tests/index.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── type-utils/         # 新增
│   ├── src/index.ts
│   ├── tests/index.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── object-utils/       # 修改: 删除冗余函数
│   └── src/index.ts
├── string-utils/       # 修改: 删除冗余函数
│   └── src/index.ts
└── array-utils/        # 保持
```

---

## Phase 1: 清理冗余函数

### Task 1: 清理 object-utils 冗余函数

**Files:**
- Modify: `packages/object-utils/src/index.ts`
- Modify: `packages/object-utils/tests/index.test.ts`

**说明:** 删除 `groupBy` 和 `getNestedValue` 两个冗余函数

- [ ] **Step 1: 读取当前 object-utils/index.ts**

读取 `packages/object-utils/src/index.ts` 确认冗余函数位置

- [ ] **Step 2: 删除 groupBy 函数**

从 `packages/object-utils/src/index.ts` 中删除以下代码:

```typescript
/**
 * 按键对数组分组
 * @param array - 源数组
 * @param key - 分组键
 * @returns 分组后的对象
 */
export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}
```

- [ ] **Step 3: 删除 getNestedValue 函数**

从 `packages/object-utils/src/index.ts` 中删除以下代码:

```typescript
/**
 * 获取嵌套对象值的别名
 * @param obj - 源对象
 * @param path - 属性路径
 * @param defaultValue - 默认值
 * @returns 属性值
 */
export const getNestedValue = <T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T | undefined => {
  return get(obj, path, defaultValue)
}
```

- [ ] **Step 4: 更新测试文件**

从 `packages/object-utils/tests/index.test.ts` 中删除 `groupBy` 和 `getNestedValue` 的相关测试

- [ ] **Step 5: 运行测试验证**

Run: `pnpm --filter @utils/object-utils test`
Expected: 所有测试通过

- [ ] **Step 6: 提交更改**

```bash
git add packages/object-utils/
git commit -m "refactor(object-utils): remove redundant groupBy and getNestedValue

BREAKING CHANGE: groupBy moved to array-utils, use array-utils.groupBy
BREAKING CHANGE: getNestedValue removed, use object-utils.get instead"
```

---

### Task 2: 清理 string-utils 冗余函数

**Files:**
- Modify: `packages/string-utils/src/index.ts`
- Modify: `packages/string-utils/tests/index.test.ts`

**说明:** 删除 `parseQuery` 和 `buildQuery` 两个冗余函数

- [ ] **Step 1: 读取当前 string-utils/index.ts**

读取 `packages/string-utils/src/index.ts` 确认冗余函数位置

- [ ] **Step 2: 删除 parseQuery 函数**

从 `packages/string-utils/src/index.ts` 中删除以下代码:

```typescript
/**
 * 解析查询字符串
 * @param query - 查询字符串（如 "a=1&b=2"）
 * @returns 参数对象
 */
export const parseQuery = (query: string): Record<string, string> => {
  const params = new URLSearchParams(query)
  const result: Record<string, string> = {}
  params.forEach((value, key) => {
    result[key] = value
  })
  return result
}
```

- [ ] **Step 3: 删除 buildQuery 函数**

从 `packages/string-utils/src/index.ts` 中删除以下代码:

```typescript
/**
 * 构建查询字符串
 * @param params - 参数对象
 * @returns 查询字符串
 */
export const buildQuery = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}
```

- [ ] **Step 4: 更新测试文件**

从 `packages/string-utils/tests/index.test.ts` 中删除 `parseQuery` 和 `buildQuery` 的相关测试

- [ ] **Step 5: 运行测试验证**

Run: `pnpm --filter @utils/string-utils test`
Expected: 所有测试通过

- [ ] **Step 6: 提交更改**

```bash
git add packages/string-utils/
git commit -m "refactor(string-utils): remove redundant parseQuery and buildQuery

BREAKING CHANGE: use url-utils.getAllParams instead of parseQuery
BREAKING CHANGE: use url-utils.buildUrl instead of buildQuery"
```

---

## Phase 2: 创建 fn-utils 包

### Task 3: 创建 fn-utils 包结构

**Files:**
- Create: `packages/fn-utils/package.json`
- Create: `packages/fn-utils/tsconfig.json`
- Create: `packages/fn-utils/README.md`

- [ ] **Step 1: 创建 package.json**

创建 `packages/fn-utils/package.json`:

```json
{
  "name": "@utils/fn-utils",
  "version": "1.0.0",
  "description": "Functional programming utilities",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "test": "vitest run",
    "dev": "vitest"
  },
  "keywords": ["utils", "functional", "debounce", "throttle"],
  "license": "MIT"
}
```

- [ ] **Step 2: 创建 tsconfig.json**

创建 `packages/fn-utils/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: 创建 README.md**

创建 `packages/fn-utils/README.md`:

```markdown
# @utils/fn-utils

Functional programming utilities.

## Install

```bash
pnpm add @utils/fn-utils
```

## Usage

### debounce

```typescript
import { debounce } from '@utils/fn-utils'

const debouncedFn = debounce((value: string) => {
  console.log(value)
}, 300)
```

### compose / pipe

```typescript
import { compose, pipe } from '@utils/fn-utils'

const process = pipe(
  (x: number) => x * 2,
  (x) => x + 1
)
```

## API

- `debounce(fn, wait)` - 防抖
- `throttle(fn, wait)` - 节流
- `compose(...fns)` - 函数组合 (右到左)
- `pipe(...fns)` - 函数组合 (左到右)
- `curry(fn)` - 柯里化
- `memoize(fn)` - 记忆化
- `once(fn)` - 单次执行
- `noop()` - 空函数
```

- [ ] **Step 4: 提交基础结构**

```bash
git add packages/fn-utils/
git commit -m "feat(fn-utils): initial package structure"
```

---

### Task 4: 实现 fn-utils 核心函数

**Files:**
- Create: `packages/fn-utils/src/index.ts`
- Create: `packages/fn-utils/tests/index.test.ts`

- [ ] **Step 1: 编写 debounce 和 throttle 测试**

创建 `packages/fn-utils/tests/index.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle, noop } from '../src/index'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreMocks()
  })

  it('should delay function execution', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should cancel previous calls', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the function', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('arg1', 'arg2')
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreMocks()
  })

  it('should limit function calls', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    throttled()
    throttled()

    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should allow new call after interval', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    vi.advanceTimersByTime(100)
    throttled()

    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('noop', () => {
  it('should do nothing', () => {
    expect(noop()).toBeUndefined()
    expect(() => noop(1, 2, 3)).not.toThrow()
  })
})
```

- [ ] **Step 2: 运行测试验证失败**

Run: `pnpm --filter @utils/fn-utils test`
Expected: FAIL - "Cannot find module '../src/index'"

- [ ] **Step 3: 实现 debounce, throttle, noop**

创建 `packages/fn-utils/src/index.ts`:

```typescript
/**
 * 防抖函数
 * @param fn - 要防抖的函数
 * @param wait - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, wait)
  }
}

/**
 * 节流函数
 * @param fn - 要节流的函数
 * @param wait - 间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - lastTime)

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastTime = now
      fn.apply(this, args)
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now()
        timeoutId = null
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 空函数
 */
export function noop(): void {}

/**
 * 确保函数只执行一次
 * @param fn - 要执行的函数
 * @returns 包装后的函数
 */
export function once<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>) {
    if (!called) {
      called = true
      result = fn.apply(this, args) as ReturnType<T>
    }
    return result
  }
}

/**
 * 记忆化函数
 * @param fn - 要记忆化的函数
 * @returns 包装后的函数
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
): T & { cache: Map<string, ReturnType<T>>; clear: () => void } {
  const cache = new Map<string, ReturnType<T>>()

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn.apply(this, args) as ReturnType<T>
    cache.set(key, result)
    return result
  } as T & { cache: Map<string, ReturnType<T>>; clear: () => void }

  memoized.cache = cache
  memoized.clear = () => cache.clear()

  return memoized
}

/**
 * 函数组合 (从右到左)
 * @param fns - 要组合的函数数组
 * @returns 组合后的函数
 */
export function compose<T>(
  ...fns: Array<(arg: T) => T>
): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg)
}

/**
 * 函数管道 (从左到右)
 * @param fns - 要组合的函数数组
 * @returns 组合后的函数
 */
export function pipe<T>(
  ...fns: Array<(arg: T) => T>
): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg)
}

/**
 * 柯里化函数
 * @param fn - 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry(fn: Function): Function {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (this: any, ...nextArgs: any[]) {
      return curried.apply(this, [...args, ...nextArgs])
    }
  }
}
```

- [ ] **Step 4: 补充完整测试**

在 `packages/fn-utils/tests/index.test.ts` 中添加 `once`, `memoize`, `compose`, `pipe`, `curry` 的测试

- [ ] **Step 5: 运行测试验证**

Run: `pnpm --filter @utils/fn-utils test`
Expected: 所有测试通过

- [ ] **Step 6: 构建包**

Run: `pnpm --filter @utils/fn-utils build`
Expected: 构建成功，生成 dist 目录

- [ ] **Step 7: 提交**

```bash
git add packages/fn-utils/
git commit -m "feat(fn-utils): add debounce, throttle, compose, pipe, curry, memoize, once, noop"
```

---

## Phase 3: 创建 async-utils 包

### Task 5: 创建 async-utils 包

**Files:**
- Create: `packages/async-utils/package.json`
- Create: `packages/async-utils/tsconfig.json`
- Create: `packages/async-utils/README.md`
- Create: `packages/async-utils/src/index.ts`
- Create: `packages/async-utils/tests/index.test.ts`

- [ ] **Step 1: 创建基础结构**

创建 `packages/async-utils/package.json`:

```json
{
  "name": "@utils/async-utils",
  "version": "1.0.0",
  "description": "Async utilities",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "test": "vitest run",
    "dev": "vitest"
  },
  "keywords": ["utils", "async", "promise", "retry"],
  "license": "MIT",
  "dependencies": {
    "@utils/fn-utils": "workspace:*"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json 和 README.md**

参考 fn-utils 的结构创建

- [ ] **Step 3: 编写测试**

创建 `packages/async-utils/tests/index.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sleep, retry, timeout } from '../src/index'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreMocks()
  })

  it('should resolve after specified milliseconds', async () => {
    const promise = sleep(1000)
    vi.advanceTimersByTime(1000)
    await expect(promise).resolves.toBeUndefined()
  })
})

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreMocks()
  })

  it('should retry failed operations', async () => {
    let attempts = 0
    const fn = vi.fn().mockImplementation(() => {
      attempts++
      if (attempts < 3) {
        throw new Error('Failed')
      }
      return 'success'
    })

    const result = retry(fn, { attempts: 3, delay: 100 })
    vi.advanceTimersByTime(300)
    await expect(result).resolves.toBe('success')
  })

  it('should throw after max attempts', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('Always fails'))

    const result = retry(fn, { attempts: 3, delay: 100 })
    vi.advanceTimersByTime(400)
    await expect(result).rejects.toThrow('Always fails')
  })
})

describe('timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreMocks()
  })

  it('should resolve if operation completes within timeout', async () => {
    const promise = new Promise((resolve) => setTimeout(() => resolve('done'), 100))
    const result = timeout(promise, 1000)
    vi.advanceTimersByTime(100)
    await expect(result).resolves.toBe('done')
  })

  it('should reject if operation times out', async () => {
    const promise = new Promise((resolve) => setTimeout(() => resolve('done'), 2000))
    const result = timeout(promise, 100)
    vi.advanceTimersByTime(100)
    await expect(result).rejects.toThrow('Operation timed out')
  })
})
```

- [ ] **Step 4: 实现函数**

创建 `packages/async-utils/src/index.ts`:

```typescript
import { debounce } from '@utils/fn-utils'

/**
 * 延迟指定毫秒
 * @param ms - 延迟时间（毫秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface RetryOptions {
  attempts: number
  delay: number
  onRetry?: (error: Error, attempt: number) => void
}

/**
 * 重试失败的异步操作
 * @param fn - 要重试的函数
 * @param options - 重试选项
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const { attempts, delay, onRetry } = options
  let lastError: Error

  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (onRetry && error instanceof Error) {
        onRetry(lastError, i)
      }
      if (i < attempts) {
        await sleep(delay)
      }
    }
  }

  throw lastError!
}

export interface TimeoutOptions {
  message?: string
}

/**
 * 为 Promise 添加超时
 * @param promise - 要添加超时的 Promise
 * @param ms - 超时时间（毫秒）
 * @param options - 选项
 * @returns Promise
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  options: TimeoutOptions = {},
): Promise<T> {
  const { message = 'Operation timed out' } = options

  return Promise.race([
    promise,
    sleep(ms).then(() => {
      throw new Error(message)
    }),
  ])
}

/**
 * 异步防抖
 * @param fn - 要防抖的异步函数
 * @param wait - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function pDebounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(async () => {
      try {
        await fn.apply(this, args)
      } catch (error) {
        console.error('pDebounce error:', error)
      }
      timeoutId = null
    }, wait)
  }
}
```

- [ ] **Step 5: 运行测试和构建**

Run: `pnpm --filter @utils/async-utils test`
Run: `pnpm --filter @utils/async-utils build`

- [ ] **Step 6: 提交**

```bash
git add packages/async-utils/
git commit -m "feat(async-utils): add sleep, retry, timeout, pDebounce"
```

---

## Phase 4: 创建 type-utils 包

### Task 6: 创建 type-utils 包

**Files:**
- Create: `packages/type-utils/package.json`
- Create: `packages/type-utils/tsconfig.json`
- Create: `packages/type-utils/README.md`
- Create: `packages/type-utils/src/index.ts`
- Create: `packages/type-utils/tests/index.test.ts`

- [ ] **Step 1: 创建基础结构**

创建 `packages/type-utils/package.json`:

```json
{
  "name": "@utils/type-utils",
  "version": "1.0.0",
  "description": "Type checking utilities",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "test": "vitest run",
    "dev": "vitest"
  },
  "keywords": ["utils", "types", "type-guards"],
  "license": "MIT"
}
```

- [ ] **Step 2: 创建 tsconfig.json 和 README.md**

参考 fn-utils 的结构创建

- [ ] **Step 3: 编写测试**

创建 `packages/type-utils/tests/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isNull,
  isUndefined,
  isEmpty,
  isPromise,
} from '../src/index'

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('hello')).toBe(true)
    expect(isString('')).toBe(true)
  })

  it('should return false for non-strings', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1.5)).toBe(true)
    expect(isNumber(-1)).toBe(true)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber('123')).toBe(false)
    expect(isNumber(NaN)).toBe(false)
  })
})

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it('should return false for non-arrays', () => {
    expect(isArray({})).toBe(false)
    expect(isArray('array')).toBe(false)
  })
})

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  it('should return false for non-empty values', () => {
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})

describe('isPromise', () => {
  it('should return true for promises', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('should return false for non-promises', () => {
    expect(isPromise(123)).toBe(false)
    expect(isPromise({ then: 1 })).toBe(false)
  })
})
```

- [ ] **Step 4: 实现函数**

创建 `packages/type-utils/src/index.ts`:

```typescript
/**
 * 检查值是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 检查值是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 检查值是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 检查值是否为数组
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * 检查值是否为普通对象
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 检查值是否为函数
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 检查值是否为 null
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 检查值是否为 undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
 * 检查值是否为空 (null, undefined, '', [], {})
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 检查值是否为 Promise
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  if (value === null || value === undefined) return false
  const proto = Object.getPrototypeOf(value)
  return (
    (proto === Promise.prototype ||
      (proto !== null &&
        proto.constructor !== null &&
        proto.constructor.name === 'Promise')) &&
    isFunction((value as any).then)
  )
}

/**
 * 检查值是否为空字符串或仅包含空白
 */
export function isBlank(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length === 0
}

/**
 * 检查值是否为有效日期
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * 检查值是否为整数
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value as number)
}

/**
 * 检查值是否为正数
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0
}

/**
 * 检查值是否为负数
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0
}
```

- [ ] **Step 5: 运行测试和构建**

Run: `pnpm --filter @utils/type-utils test`
Run: `pnpm --filter @utils/type-utils build`

- [ ] **Step 6: 提交**

```bash
git add packages/type-utils/
git commit -m "feat(type-utils): add type guard functions"
```

---

## Phase 5: 更新 pnpm-workspace.yaml

### Task 7: 注册新包到 workspace

**Files:**
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: 检查 pnpm-workspace.yaml**

读取 `pnpm-workspace.yaml` 确认当前配置

- [ ] **Step 2: 确保新包在 packages/* 目录下**

新包 `fn-utils`, `async-utils`, `type-utils` 已在 `packages/` 目录下，无需修改

- [ ] **Step 3: 提交**

```bash
git add pnpm-workspace.yaml
git commit -m "chore: workspace includes new packages"
```

---

## Phase 6: 完整验证

### Task 8: 运行完整测试和构建

**Files:**
- Modify: 所有相关包

- [ ] **Step 1: 安装依赖**

Run: `pnpm install`

- [ ] **Step 2: 运行所有测试**

Run: `pnpm test`
Expected: 所有包测试通过

- [ ] **Step 3: 构建所有包**

Run: `pnpm -r build`
Expected: 所有包构建成功

- [ ] **Step 4: 类型检查**

Run: `pnpm typecheck` (或 `pnpm tsc --noEmit`)

---

## 任务依赖关系

```
Task 1: 清理 object-utils    → Task 2: 清理 string-utils
Task 2                         → Task 3: 创建 fn-utils 结构
Task 3                          → Task 4: 实现 fn-utils 核心函数
Task 4                          → Task 5: 创建 async-utils
Task 5                          → Task 6: 创建 type-utils
Task 6                          → Task 7: 更新 workspace
Task 7                          → Task 8: 完整验证
```

---

## 验收标准

1. [ ] `object-utils` 中已删除 `groupBy` 和 `getNestedValue`
2. [ ] `string-utils` 中已删除 `parseQuery` 和 `buildQuery`
3. [ ] `fn-utils` 包已创建，包含 debounce, throttle, compose, pipe, curry, memoize, once, noop
4. [ ] `async-utils` 包已创建，包含 sleep, retry, timeout, pDebounce
5. [ ] `type-utils` 包已创建，包含 isString, isNumber, isBoolean, isArray, isObject, isFunction, isNull, isUndefined, isEmpty, isPromise
6. [ ] 所有新包测试通过
7. [ ] 所有新包构建成功
8. [ ] 所有原有包测试仍然通过
