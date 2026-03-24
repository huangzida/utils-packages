# @zid-utils/diff-utils

> 对象差异比较工具库 (Object and array difference comparison utilities)

## 安装

```bash
pnpm add @zid-utils/diff-utils
```

## 概述

提供对象和数组的深度比较功能，适用于表单变更检测、配置对比、版本差异显示等场景。

## 使用方法

```typescript
import {
  arraysEqual,
  deepEqual,
  diff,
} from "@zid-utils/diff-utils";

// 比较数组
arraysEqual([1, 2, 3], [1, 2, 3]); // true
arraysEqual([1, 2, 3], [1, 2]); // false

// 深度比较
deepEqual({ a: 1 }, { a: 1 }); // true
deepEqual({ a: { b: 1 } }, { a: { b: 2 } }); // false

// 获取差异
diff({ a: 1, b: 2 }, { a: 1, b: 3 }); // { b: 3 }
diff({ name: "张三" }, { name: "李四" }); // { name: "李四" }
```

## 函数详解

### arraysEqual

比较两个数组是否相等（考虑重复元素）。

```typescript
function arraysEqual<T>(a: T[], b: T[]): boolean
```

**参数**:

- `a`: 数组 1
- `b`: 数组 2

**返回值**: 两个数组是否相等

**示例**:

```typescript
arraysEqual([1, 2, 3], [1, 2, 3]); // true
arraysEqual([1, 2, 3], [3, 2, 1]); // false (顺序不同)
arraysEqual([1, 1, 2], [1, 2, 1]); // true (考虑重复)
arraysEqual([], []); // true
arraysEqual([1], []); // false
```

### deepEqual

深度比较两个值是否相等。

```typescript
function deepEqual(a: unknown, b: unknown): boolean
```

**参数**:

- `a`: 值 1
- `b`: 值 2

**返回值**: 两个值是否相等

**示例**:

```typescript
// 基础类型
deepEqual(1, 1); // true
deepEqual("hello", "hello"); // true
deepEqual(true, true); // true
deepEqual(null, null); // true

// 数组
deepEqual([1, 2, 3], [1, 2, 3]); // true
deepEqual([1, [2, 3]], [1, [2, 3]]); // true

// 对象
deepEqual({ a: 1 }, { a: 1 }); // true
deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true

// 不相等的情况
deepEqual(1, "1"); // false (类型不同)
deepEqual([1, 2], [1, 2, 3]); // false
deepEqual({ a: 1 }, { a: 2 }); // false
deepEqual({ a: 1 }, { b: 1 }); // false (键不同)
```

### diff

比较两个对象的差异。

```typescript
function diff<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): DiffResult<T> | null
```

**参数**:

- `obj1`: 对象 1（旧值）
- `obj2`: 对象 2（新值）

**返回值**: 差异对象，包含所有在 obj2 中但与 obj1 不同的属性。如果完全相同返回 `null`。

**类型定义**:

```typescript
type DiffResult<T> = Partial<{
  [K in keyof T]: T[K] extends object ? DiffResult<T[K]> : T[K]
}>
```

**示例**:

```typescript
diff({ a: 1, b: 2 }, { a: 1, b: 3 });
// { b: 3 }

diff({ name: "张三", age: 28 }, { name: "李四", age: 28 });
// { name: "李四" }

diff(
  { user: { name: "张三", profile: { age: 28 } } },
  { user: { name: "张三", profile: { age: 30 } } }
);
// { user: { profile: { age: 30 } } }

diff({ a: 1 }, { a: 1 });
// null (完全相同)
```

### isObject

检查值是否为普通对象。

```typescript
function isObject(value: unknown): value is Record<string, unknown>
```

**返回值**: 是否为普通对象

**示例**:

```typescript
isObject({}); // true
isObject({ a: 1 }); // true
isObject([]); // false
isObject(null); // false
isObject("string"); // false
isObject(123); // false
```

## 实际应用示例

### 表单变更检测

```typescript
import { diff } from "@zid-utils/diff-utils";

interface UserForm {
  name: string;
  email: string;
  phone: string;
}

function hasFormChanged(
  initialValues: UserForm,
  currentValues: UserForm
): boolean {
  return diff(initialValues, currentValues) !== null;
}

const initial = {
  name: "张三",
  email: "zhang@example.com",
  phone: "13812345678",
};

const current = {
  name: "张三",
  email: "zhang@example.com",
  phone: "13912345678",
};

if (hasFormChanged(initial, current)) {
  console.log("表单已修改");
}
```

### 配置对比

```typescript
import { diff } from "@zid-utils/diff-utils";

function compareConfigs(
  oldConfig: Record<string, any>,
  newConfig: Record<string, any>
): {
  changed: Record<string, any> | null;
  hasChanges: boolean;
} {
  const changes = diff(oldConfig, newConfig);

  return {
    changed: changes,
    hasChanges: changes !== null,
  };
}

const oldConfig = {
  database: {
    host: "localhost",
    port: 3306,
    name: "myapp",
  },
  cache: {
    enabled: true,
    ttl: 3600,
  },
};

const newConfig = {
  database: {
    host: "db.example.com",
    port: 3306,
    name: "myapp",
  },
  cache: {
    enabled: true,
    ttl: 7200,
  },
};

const result = compareConfigs(oldConfig, newConfig);
console.log(result.hasChanges); // true
console.log(result.changed);
// {
//   database: { host: "db.example.com" },
//   cache: { ttl: 7200 }
// }
```

### 版本差异显示

```typescript
import { diff } from "@zid-utils/diff-utils";

interface VersionData {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

function getVersionChanges(
  oldVersion: VersionData,
  newVersion: VersionData
): {
    added: Record<string, string>;
    removed: Record<string, string>;
    updated: Record<string, { old: string; new: string }>;
  } {
  const allKeys = new Set([
    ...Object.keys(oldVersion.dependencies),
    ...Object.keys(newVersion.dependencies),
  ]);

  const added: Record<string, string> = {};
  const removed: Record<string, string> = {};
  const updated: Record<string, { old: string; new: string }> = {};

  for (const key of allKeys) {
    const oldVersion = oldVersion.dependencies[key];
    const newVersion = newVersion.dependencies[key];

    if (!oldVersion && newVersion) {
      added[key] = newVersion;
    } else if (oldVersion && !newVersion) {
      removed[key] = oldVersion;
    } else if (oldVersion !== newVersion) {
      updated[key] = { old: oldVersion!, new: newVersion! };
    }
  }

  return { added, removed, updated };
}

const oldPkg = {
  dependencies: { lodash: "4.17.21", axios: "1.3.0" },
  devDependencies: { typescript: "5.0.0" },
};

const newPkg = {
  dependencies: { lodash: "4.17.21", react: "18.2.0" },
  devDependencies: { typescript: "5.1.0" },
};

const changes = getVersionChanges(oldPkg, newPkg);
console.log(changes);
// {
//   added: { react: "18.2.0" },
//   removed: { axios: "1.3.0" },
//   updated: { typescript: { old: "5.0.0", new: "5.1.0" } }
// }
```

### 对象深度比较

```typescript
import { deepEqual } from "@zid-utils/diff-utils";

interface ApiResponse {
  data: {
    user: {
      id: number;
      name: string;
      settings: {
        theme: string;
        notifications: boolean;
      };
    };
  };
  status: string;
}

function isResponseUnchanged(
  oldResponse: ApiResponse,
  newResponse: ApiResponse
): boolean {
  return deepEqual(oldResponse, newResponse);
}

const response1: ApiResponse = {
  data: {
    user: {
      id: 1,
      name: "张三",
      settings: { theme: "dark", notifications: true },
    },
  },
  status: "success",
};

const response2: ApiResponse = {
  data: {
    user: {
      id: 1,
      name: "张三",
      settings: { theme: "dark", notifications: true },
    },
  },
  status: "success",
};

console.log(isResponseUnchanged(response1, response2)); // true
```

### 数据同步检查

```typescript
import { arraysEqual } from "@zid-utils/diff-utils";

interface SyncItem {
  id: string;
  version: number;
}

function findUnsyncedItems(
  localItems: SyncItem[],
  serverItems: SyncItem[]
): {
    toUpload: SyncItem[];
    toDownload: SyncItem[];
  } {
  const localIds = localItems.map((i) => i.id);
  const serverIds = serverItems.map((i) => i.id);

  const toUpload = localItems.filter(
    (item) =>
      !serverIds.includes(item.id) ||
      serverItems.find((s) => s.id === item.id)!.version < item.version
  );

  const toDownload = serverItems.filter(
    (item) =>
      !localIds.includes(item.id) ||
      localItems.find((l) => l.id === item.id)!.version < item.version
  );

  return { toUpload, toDownload };
}

const local = [
  { id: "1", version: 2 },
  { id: "2", version: 1 },
  { id: "3", version: 3 },
];

const server = [
  { id: "1", version: 1 },
  { id: "4", version: 1 },
];

const { toUpload, toDownload } = findUnsyncedItems(local, server);
console.log(toUpload); // [{ id: "1", version: 2 }, { id: "2", version: 1 }, { id: "3", version: 3 }]
console.log(toDownload); // [{ id: "4", version: 1 }]
```

### 缓存验证

```typescript
import { deepEqual } from "@zid-utils/diff-utils";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  checksum?: string;
}

function isCacheValid<T>(
  cache: CacheEntry<T>,
  currentData: T,
  maxAge: number = 3600000
): boolean {
  const isExpired = Date.now() - cache.timestamp > maxAge;
  if (isExpired) return false;

  return deepEqual(cache.data, currentData);
}

// 使用
const cachedData = {
  items: [1, 2, 3],
  config: { theme: "dark" },
};

const cache: CacheEntry<typeof cachedData> = {
  data: cachedData,
  timestamp: Date.now() - 1800000, // 30 分钟前
};

console.log(isCacheValid(cache, cachedData)); // true

const newData = { items: [1, 2, 3], config: { theme: "light" } };
console.log(isCacheValid(cache, newData)); // false (数据不同)
```

## 性能说明

- `arraysEqual`: 时间复杂度 O(n)，空间复杂度 O(1)
- `deepEqual`: 使用递归比较，嵌套层级过深可能导致栈溢出
- `diff`: 只返回差异部分，性能优于全量比较

## License

MIT
