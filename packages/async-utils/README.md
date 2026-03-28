# @zid-utils/async-utils

> 异步操作工具函数库 (Async utility functions)

## 安装

```bash
pnpm add @zid-utils/async-utils
```

## 概述

提供异步操作工具函数，包括延迟、重试、超时、异步防抖等常用功能。

## 使用方法

```typescript
import { sleep, retry, timeout, pDebounce } from "@zid-utils/async-utils";

// 延迟
await sleep(1000);

// 重试
const data = await retry(fetchData, {
  attempts: 3,
  delay: 1000,
  onRetry: (err, attempt) => console.log(`Retry ${attempt}`)
});

// 超时
const result = await timeout(fetchData(), 5000);

// 异步防抖
const debouncedFetch = pDebounce(fetchData, 300);
await debouncedFetch();
```

## 函数详解

### sleep

延迟执行。

```typescript
function sleep(ms: number): Promise<void>
```

**参数**:

- `ms`: 延迟时间（毫秒）

**示例**:

```typescript
await sleep(1000); // 延迟 1 秒
console.log('1 秒后执行');
```

### retry

重试失败的异步操作。

```typescript
function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T>

interface RetryOptions {
  attempts?: number      // 最大重试次数，默认 3
  delay?: number         // 重试间隔（毫秒），默认 1000
  onRetry?: (error: Error, attempt: number) => void  // 重试回调
}
```

**参数**:

- `fn`: 要重试的异步函数
- `options`: 重试选项

**示例**:

```typescript
const fetchData = async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed');
  return response.json();
};

// 基本重试
const data = await retry(fetchData, { attempts: 3 });

// 带回调的重试
const data = await retry(fetchData, {
  attempts: 5,
  delay: 2000,
  onRetry: (error, attempt) => {
    console.log(`第 ${attempt} 次失败: ${error.message}`);
  }
});
```

### timeout

为 Promise 添加超时。

```typescript
function timeout<T>(promise: Promise<T>, ms: number): Promise<T>
```

**参数**:

- `promise`: 要添加超时的 Promise
- `ms`: 超时时间（毫秒）

**示例**:

```typescript
try {
  const data = await timeout(fetch('/api/data').then(r => r.json()), 5000);
  console.log(data);
} catch (error) {
  if (error.message === 'Operation timed out') {
    console.log('请求超时');
  }
}
```

### pDebounce

异步函数的防抖版本。

```typescript
function pDebounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
```

**参数**:

- `fn`: 要防抖的异步函数
- `wait`: 延迟时间（毫秒）

**示例**:

```typescript
const search = async (query: string) => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
};

const debouncedSearch = pDebounce(search, 300);

debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
// 只执行最后一次调用
const results = await debouncedSearch('abc');
```

## 实际应用示例

### API 请求重试

```typescript
import { retry } from "@zid-utils/async-utils";

async function fetchWithRetry(url: string, options?: RetryOptions) {
  return retry(() => fetch(url).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }), options);
}

// 使用
const data = await fetchWithRetry('/api/users', {
  attempts: 5,
  delay: 1000,
  onRetry: (err, attempt) => {
    console.warn(`请求失败，第 ${attempt} 次重试`);
  }
});
```

### 带超时的请求

```typescript
import { timeout } from "@zid-utils/async-utils";

async function fetchWithTimeout(url: string, timeoutMs = 5000) {
  try {
    const response = await timeout(
      fetch(url).then(r => r.json()),
      timeoutMs
    );
    return response;
  } catch (error) {
    if (error.message === 'Operation timed out') {
      throw new Error('请求超时，请稍后重试');
    }
    throw error;
  }
}
```

### 防抖搜索

```typescript
import { pDebounce } from "@zid-utils/async-utils";

class SearchService {
  private search = pDebounce(async (query: string) => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const results = await response.json();
    this.displayResults(results);
  }, 300);

  onInput(query: string) {
    this.search(query);
  }

  displayResults(results: any[]) {
    // 显示搜索结果
  }
}
```

### 组合使用

```typescript
import { retry, timeout, sleep } from "@zid-utils/async-utils";

async function robustFetch(url: string, options = {}) {
  const { attempts = 3, timeoutMs = 5000 } = options;

  const fetchFn = () => fetch(url).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

  return retry(() => timeout(fetchFn(), timeoutMs), {
    attempts,
    delay: 1000,
    onRetry: async (err, attempt) => {
      console.warn(`请求失败，${attempt} 秒后重试...`);
      await sleep(1000);
    }
  });
}
```

## License

MIT
