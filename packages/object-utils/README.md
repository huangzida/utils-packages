# @zid-utils/object-utils

> 对象操作工具函数库 (Object manipulation utility functions)

## 安装

```bash
pnpm add @zid-utils/object-utils
```

## 概述

提供对象深度操作、属性访问、转换等丰富的工具函数，包括深拷贝、深度合并、属性选择、嵌套属性访问等功能。

## 使用方法

```typescript
import {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
} from "@zid-utils/object-utils";

// 深拷贝
deepClone({ a: { b: 1 } }); // { a: { b: 1 } }

// 深度合并
deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }

// 属性选择
pick({ a: 1, b: 2, c: 3 }, ["a", "c"]); // { a: 1, c: 3 }

// 属性排除
omit({ a: 1, b: 2, c: 3 }, ["b"]); // { a: 1, c: 3 }

// 获取嵌套属性
get({ a: { b: { c: 1 } } }, "a.b.c"); // 1

// 设置嵌套属性
const obj = {};
set(obj, "a.b.c", 1); // { a: { b: { c: 1 } } }

// 检查属性存在
has({ a: { b: 1 } }, "a.b"); // true
```

## 深度操作

### deepClone

深拷贝对象，支持嵌套对象、数组、Date、Set、Map。

```typescript
function deepClone<T>(obj: T): T
```

**示例**:

```typescript
const original = {
  name: "张三",
  address: {
    city: "北京",
    district: "朝阳区",
  },
  hobbies: ["读书", "旅行"],
  createdAt: new Date(),
};

const cloned = deepClone(original);

// 修改拷贝不影响原对象
cloned.name = "李四";
cloned.address.city = "上海";

console.log(original.name); // "张三"
console.log(original.address.city); // "北京"
console.log(cloned.createdAt instanceof Date); // true
```

### deepMerge

深度合并多个对象。

```typescript
function deepMerge<T>(target: T, ...sources: Partial<T>[]): T
```

**参数**:

- `target`: 目标对象
- `sources`: 源对象（可以有多个）

**示例**:

```typescript
const base = {
  theme: {
    colors: {
      primary: "blue",
      secondary: "gray",
    },
  },
  layout: "sidebar",
};

const override = {
  theme: {
    colors: {
      primary: "red",
    },
  },
};

deepMerge(base, override);
// {
//   theme: {
//     colors: {
//       primary: "red",
//       secondary: "gray"
//     }
//   },
//   layout: "sidebar"
// }
```

## 属性选择

### pick

从对象中选取指定的键。

```typescript
function pick<T, K>(obj: T, keys: K[]): Pick<T, K>
```

**示例**:

```typescript
const user = {
  id: 1,
  name: "张三",
  email: "zhang@example.com",
  password: "secret",
  age: 28,
};

// 只选取需要的字段
pick(user, ["id", "name", "email"]);
// { id: 1, name: "张三", email: "zhang@example.com" }
```

### omit

从对象中排除指定的键。

```typescript
function omit<T, K>(obj: T, keys: K[]): Omit<T, K>
```

**示例**:

```typescript
const user = {
  id: 1,
  name: "张三",
  email: "zhang@example.com",
  password: "secret",
  age: 28,
};

// 排除敏感字段
omit(user, ["password"]);
// { id: 1, name: "张三", email: "zhang@example.com", age: 28 }
```

## 嵌套属性访问

### get

获取嵌套对象的值。

```typescript
function get<T>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined
```

**参数**:

- `obj`: 目标对象
- `path`: 属性路径（如 `"a.b.c"`）
- `defaultValue`: 默认值（当路径不存在时返回）

**示例**:

```typescript
const config = {
  database: {
    host: "localhost",
    port: 3306,
    credentials: {
      username: "root",
      password: "secret",
    },
  },
};

// 安全获取嵌套属性
get(config, "database.host"); // "localhost"
get(config, "database.credentials.username"); // "root"
get(config, "database.timeout", 5000); // 5000 (默认值)
get(config, "nonexistent.path", "default"); // "default"
```

### set

设置嵌套对象的值。

```typescript
function set(
  obj: Record<string, any>,
  path: string,
  value: any
): Record<string, any>
```

**返回值**: 设置后的对象

**示例**:

```typescript
const config = {};

set(config, "database.host", "localhost");
set(config, "database.port", 3306);
set(config, "database.credentials.username", "root");

console.log(config);
// {
//   database: {
//     host: "localhost",
//     port: 3306,
//     credentials: {
//       username: "root"
//     }
//   }
// }
```

### has

检查对象是否有指定路径的属性。

```typescript
function has(obj: Record<string, any>, path: string): boolean
```

**示例**:

```typescript
const user = {
  profile: {
    name: "张三",
  },
};

has(user, "profile"); // true
has(user, "profile.name"); // true
has(user, "profile.age"); // false
has(user, "nonexistent"); // false
```

## 对象转换

### flatten

扁平化嵌套对象。

```typescript
function flatten(
  obj: Record<string, any>,
  separator?: string
): Record<string, any>
```

**参数**:

- `obj`: 嵌套对象
- `separator`: 路径分隔符，默认 `"."`

**示例**:

```typescript
flatten({
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
});

// {
//   "a": 1,
//   "b.c": 2,
//   "b.d.e": 3
// }

flatten({
  a: 1,
  b: { c: 2 },
}, "/");
// {
//   "a": 1,
//   "b/c": 2
// }
```

### unflatten

反扁平化对象。

```typescript
function unflatten(
  obj: Record<string, any>,
  separator?: string
): Record<string, any>
```

**示例**:

```typescript
unflatten({
  "a": 1,
  "b.c": 2,
  "b.d.e": 3,
});

// {
//   a: 1,
//   b: {
//     c: 2,
//     d: {
//       e: 3
//     }
//   }
// }
```

## 对象检查

### isEmpty

检查对象是否为空。

```typescript
function isEmpty(obj: any): boolean
```

**返回值**: 对象是否为空（无自身可枚举属性）

**示例**:

```typescript
isEmpty({}); // true
isEmpty({ a: 1 }); // false
isEmpty([]); // true
isEmpty([1, 2]); // false
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(""); // true
isEmpty("hello"); // false
```

## 对象遍历

### values

获取对象的所有值。

```typescript
function values<T>(obj: Record<string, T>): T[]
```

**示例**:

```typescript
values({ a: 1, b: 2, c: 3 }); // [1, 2, 3]
```

### keys

获取对象的所有键。

```typescript
function keys<K>(obj: Record<K, any>): K[]
```

**示例**:

```typescript
keys({ a: 1, b: 2, c: 3 }); // ["a", "b", "c"]
```

### entries

获取对象的所有键值对。

```typescript
function entries<K, T>(obj: Record<K, T>): [K, T][]
```

**示例**:

```typescript
entries({ a: 1, b: 2 });
// [["a", 1], ["b", 2]]

// 常用场景：Object.fromEntries
const obj = Object.fromEntries(entries({ a: 1, b: 2 }));
```

### mapValues

遍历对象的值并转换。

```typescript
function mapValues<T, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U>
```

**示例**:

```typescript
mapValues({ a: 1, b: 2, c: 3 }, (value) => value * 2);
// { a: 2, b: 4, c: 6 }

mapValues({ name: "张三", age: 28 }, (value, key) =>
  typeof value === "number" ? value + 1 : value
);
// { name: "张三", age: 29 }
```

### filterKeys

根据条件过滤键。

```typescript
function filterKeys<T>(
  obj: T,
  predicate: (key: string) => boolean
): Partial<T>
```

**示例**:

```typescript
const user = {
  id: 1,
  name: "张三",
  password: "secret",
  email: "zhang@example.com",
};

// 排除密码相关字段
filterKeys(user, (key) => !key.includes("password"));
// { id: 1, name: "张三", email: "zhang@example.com" }
```

## 对象集合操作

### invert

交换对象的键和值。

```typescript
function invert<T>(obj: T): Record<string, string>
```

**示例**:

```typescript
invert({ a: "1", b: "2", c: "3" });
// { "1": "a", "2": "b", "3": "c" }
```

### keyBy

以键索引数组元素。

```typescript
function keyBy<T>(
  array: T[],
  key: keyof T
): Record<string, T>
```

**示例**:

```typescript
keyBy(
  [
    { id: "1", name: "张三" },
    { id: "2", name: "李四" },
  ],
  "id"
);
// {
//   "1": { id: "1", name: "张三" },
//   "2": { id: "2", name: "李四" }
// }
```

## 对象比较

### difference

获取两个对象的不同属性。

```typescript
function difference<T>(obj1: T, obj2: Partial<T>): Partial<T>
```

**示例**:

```typescript
difference(
  { a: 1, b: 2, c: 3 },
  { b: 2, c: 3 }
);
// { a: 1 }
```

### intersection

获取两个对象的相同属性。

```typescript
function intersection<T>(obj1: T, obj2: Partial<T>): Partial<T>
```

**示例**:

```typescript
intersection(
  { a: 1, b: 2, c: 3 },
  { b: 2, c: 3, d: 4 }
);
// { b: 2, c: 3 }
```

## 实用方法

### bindMethods

绑定对象的方法到自身。

```typescript
function bindMethods<T>(
  instance: T,
  methodNames: (keyof T)[]
): T
```

**示例**:

```typescript
class Counter {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}

const counter = new Counter();
bindMethods(counter, ["increment", "decrement", "reset"]);

// 常用场景：将方法作为回调传递
setTimeout(counter.increment, 1000);
```

## 实际应用示例

### 配置对象合并

```typescript
import { deepMerge } from "@zid-utils/object-utils";

const defaultConfig = {
  api: {
    baseURL: "https://api.example.com",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  retry: {
    maxAttempts: 3,
    delay: 1000,
  },
};

const userConfig = {
  api: {
    timeout: 10000,
  },
};

const finalConfig = deepMerge(defaultConfig, userConfig);
```

### 安全获取用户输入

```typescript
import { get } from "@zid-utils/object-utils";

function getUserInput(
  form: Record<string, any>,
  path: string,
  validator?: (value: any) => boolean
) {
  const value = get(form, path);

  if (validator && !validator(value)) {
    throw new Error(`Invalid value for ${path}`);
  }

  return value;
}

const form = {
  user: {
    profile: {
      name: "张三",
    },
  },
};

const name = getUserInput(form, "user.profile.name", (v) =>
  typeof v === "string" && v.length > 0
);
```

### API 响应过滤

```typescript
import { pick, omit } from "@zid-utils/object-utils";

function filterApiResponse(response: any, fields: string[]) {
  return pick(response, fields);
}

function sanitizeUser(user: any) {
  return omit(user, ["password", "token", "refreshToken"]);
}

const apiResponse = {
  id: 1,
  name: "张三",
  email: "zhang@example.com",
  password: "hashed_password",
  createdAt: "2024-01-01",
};

const filtered = filterApiResponse(apiResponse, ["id", "name", "email"]);
const safeUser = sanitizeUser(apiResponse);
```

## License

MIT
