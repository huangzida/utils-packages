# @zid-utils/type-utils

> 类型守卫工具函数库 (Type guard utility functions)

## 安装

```bash
pnpm add @zid-utils/type-utils
```

## 概述

提供类型守卫工具函数，用于在运行时检查值类型，配合 TypeScript 类型收窄（type narrowing）使用。

## 使用方法

```typescript
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
} from "@zid-utils/type-utils";

// 类型守卫
function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value is string here
  }
  if (isArray(value)) {
    console.log(value.length); // value is array here
  }
}
```

## 函数详解

### isString

检查是否为字符串。

```typescript
function isString(val: unknown): val is string
```

**示例**:

```typescript
isString('hello'); // true
isString(''); // true
isString(123); // false
```

### isNumber

检查是否为数字（非 NaN）。

```typescript
function isNumber(val: unknown): val is number
```

**示例**:

```typescript
isNumber(123); // true
isNumber(0); // true
isNumber(NaN); // false
isNumber('123'); // false
```

### isBoolean

检查是否为布尔值。

```typescript
function isBoolean(val: unknown): val is boolean
```

**示例**:

```typescript
isBoolean(true); // true
isBoolean(false); // true
isBoolean(1); // false
```

### isArray

检查是否为数组。

```typescript
function isArray(val: unknown): val is Array<unknown>
```

**示例**:

```typescript
isArray([]); // true
isArray([1, 2, 3]); // true
isArray({}); // false
```

### isObject

检查是否为普通对象（非数组、非 null）。

```typescript
function isObject(val: unknown): val is Record<string, unknown>
```

**示例**:

```typescript
isObject({}); // true
isObject({ a: 1 }); // true
isObject([]); // false
isObject(null); // false
```

### isFunction

检查是否为函数。

```typescript
function isFunction(val: unknown): val is Function
```

**示例**:

```typescript
isFunction(() => {}); // true
isFunction(Math.random); // true
isFunction({}); // false
```

### isNull

检查是否为 null。

```typescript
function isNull(val: unknown): val is null
```

**示例**:

```typescript
isNull(null); // true
isNull(undefined); // false
```

### isUndefined

检查是否为 undefined。

```typescript
function isUndefined(val: unknown): val is undefined
```

**示例**:

```typescript
isUndefined(undefined); // true
isUndefined(null); // false
```

### isEmpty

检查值是否为空。

```typescript
function isEmpty(val: unknown): boolean
```

**返回值**: null, undefined, 空字符串, 空数组, 空对象 都返回 true

**示例**:

```typescript
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(''); // true
isEmpty('   '); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty([1]); // false
isEmpty({ a: 1 }); // false
```

### isPromise

检查是否为 Promise。

```typescript
function isPromise<T = any>(val: unknown): val is Promise<T>
```

**示例**:

```typescript
isPromise(Promise.resolve()); // true
isPromise(new Promise(() => {})); // true
isPromise({ then: 1 }); // false
```

## 实际应用示例

### 类型安全的配置处理

```typescript
import { isString, isNumber, isObject } from "@zid-utils/type-utils";

interface Config {
  port: number;
  host: string;
}

function parseConfig(raw: unknown): Config {
  if (!isObject(raw)) {
    throw new Error('Config must be an object');
  }

  const { port, host } = raw;

  if (!isNumber(port)) {
    throw new Error('port must be a number');
  }

  if (!isString(host)) {
    throw new Error('host must be a string');
  }

  return { port, host };
}
```

### 安全的数据处理

```typescript
import { isArray, isString } from "@zid-utils/type-utils";

function processItems(data: unknown): string[] {
  if (!isArray(data)) {
    return [];
  }

  return data
    .filter(isString)
    .map(s => s.toUpperCase());
}

processItems(['a', 'b', 123, 'c']); // ['A', 'B', 'C']
processItems('not an array'); // []
```

### API 响应验证

```typescript
import { isObject, isString, isNumber } from "@zid-utils/type-utils";

interface User {
  id: number;
  name: string;
  email: string;
}

function validateUser(data: unknown): User | null {
  if (!isObject(data)) {
    return null;
  }

  const { id, name, email } = data;

  if (!isNumber(id) || !isString(name) || !isString(email)) {
    return null;
  }

  return { id, name, email };
}
```

### Promise 处理

```typescript
import { isPromise } from "@zid-utils/type-utils";

async function handleValue(value: unknown) {
  if (isPromise(value)) {
    return await value;
  }
  return value;
}
```

### 表单验证

```typescript
import { isEmpty, isString, isNumber } from "@zid-utils/type-utils";

interface FormData {
  username: string;
  age: number;
}

function validateForm(data: Partial<FormData>): string[] {
  const errors: string[] = [];

  if (isEmpty(data.username)) {
    errors.push('用户名不能为空');
  } else if (!isString(data.username) || data.username.length < 3) {
    errors.push('用户名至少3个字符');
  }

  if (isEmpty(data.age)) {
    errors.push('年龄不能为空');
  } else if (!isNumber(data.age) || data.age < 0 || data.age > 150) {
    errors.push('请输入有效的年龄');
  }

  return errors;
}
```

## License

MIT
