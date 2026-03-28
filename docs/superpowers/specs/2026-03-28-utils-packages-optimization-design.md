# Utils-Packages 优化与扩展设计规格

## 一、背景与目标

### 1.1 为什么需要优化

当前 monorepo 存在以下问题：

**冗余问题:**
- `object-utils.groupBy` 与 `array-utils.groupBy` 功能重叠但签名不同
- `object-utils.getNestedValue` 是 `object-utils.get` 的别名，无独立价值
- `string-utils.parseQuery/buildQuery` 与 `url-utils` 功能重复
- `window-utils.openWindow` 与其他包的窗口函数重复

**缺失的通用功能:**
- 无函数式编程工具 (debounce, throttle, compose, pipe 等)
- 无类型安全工具 (类型守卫、验证器)
- 无异步处理工具 (retry, timeout 等)

### 1.2 优化目标

1. **删除冗余**: 移除重复函数，统一到最合适的包
2. **扩展功能**: 新增函数式编程工具包
3. **保持独立**: 每个工具独立成包，按需安装
4. **渐进实施**: 低风险，小步快跑

---

## 二、重构计划

### 2.1 删除的冗余函数

| 当前函数 | 位置 | 处理方式 | 迁移到 |
|----------|------|----------|--------|
| `groupBy` | object-utils | 删除 | array-utils.groupBy |
| `getNestedValue` | object-utils | 删除别名 | object-utils.get |
| `parseQuery` | string-utils | 删除 | url-utils.parseQuery |
| `buildQuery` | string-utils | 删除 | url-utils.buildQuery |
| `isEmpty` (字符串版) | string-utils | 保留，但建议用 trim | - |

### 2.2 函数签名统一

统一 `groupBy` 函数签名：

```typescript
// array-utils (保留并扩展)
export const groupBy = <T>(
  arr: T[],
  keyFn: (item: T) => string | number
): Record<string | number, T[]>
```

---

## 三、新增工具包

### 3.1 fn-utils (函数式编程工具)

**位置**: `packages/fn-utils`

**函数列表:**

| 函数 | 描述 | 签名 |
|------|------|------|
| `debounce` | 防抖 | `(fn, wait) => function` |
| `throttle` | 节流 | `(fn, wait) => function` |
| `compose` | 函数组合 (右到左) | `(...fns) => function` |
| `pipe` | 函数组合 (左到右) | `(...fns) => function` |
| `curry` | 柯里化 | `(fn) => function` |
| `memoize` | 记忆化 | `(fn) => function` |
| `once` | 单次执行 | `(fn) => function` |
| `noop` | 空函数 | `() => void` |

**使用示例:**

```typescript
import { debounce, compose, pipe, memoize } from '@utils/fn-utils'

// 防抖
const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query)
}, 300)

// 函数组合
const processData = pipe(
  (x: number) => x * 2,
  (x) => x + 1,
  (x) => String(x)
)

// 记忆化
const expensiveCalc = memoize((n: number) => {
  console.log('Calculating...')
  return n * n
})
```

### 3.2 async-utils (异步工具)

**位置**: `packages/async-utils`

**函数列表:**

| 函数 | 描述 | 签名 |
|------|------|------|
| `sleep` | 延迟 | `(ms) => Promise<void>` |
| `retry` | 重试 | `(fn, options) => Promise<T>` |
| `timeout` | 超时 | `(promise, ms) => Promise<T>` |
| `pDebounce` | 异步防抖 | `(fn, wait) => function` |

**使用示例:**

```typescript
import { sleep, retry, timeout } from '@utils/async-utils'

// 延迟
await sleep(1000)

// 重试
const data = await retry(fetchData, {
  attempts: 3,
  delay: 1000,
  onRetry: (err, attempt) => console.log(`Retry ${attempt}`)
})

// 超时
const result = await timeout(fetchData(), 5000)
```

### 3.3 type-utils (类型工具)

**位置**: `packages/type-utils`

**函数列表:**

| 函数 | 描述 | 签名 |
|------|------|------|
| `isString` | 是否字符串 | `(val) => val is string` |
| `isNumber` | 是否数字 | `(val) => val is number` |
| `isBoolean` | 是否布尔 | `(val) => val is boolean` |
| `isArray` | 是否数组 | `(val) => val is array` |
| `isObject` | 是否对象 | `(val) => val is object` |
| `isFunction` | 是否函数 | `(val) => val is function` |
| `isNull` | 是否 null | `(val) => val is null` |
| `isUndefined` | 是否 undefined | `(val) => val is undefined` |
| `isEmpty` | 是否空值 | `(val) => boolean` |
| `isPromise` | 是否 Promise | `(val) => val is Promise` |

**使用示例:**

```typescript
import { isString, isArray, isEmpty } from '@utils/type-utils'

// 类型守卫
function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()) // value is string here
  }
  if (isArray(value)) {
    console.log(value.length) // value is array here
  }
}
```

---

## 四、包结构调整

### 4.1 最终包结构

```
packages/
├── fn-utils/         # 新增: 函数式编程工具
├── async-utils/       # 新增: 异步工具
├── type-utils/        # 新增: 类型工具
├── array-utils/       # 优化: 移除冗余
├── object-utils/      # 优化: 移除冗余
├── string-utils/      # 优化: 移除冗余
├── url-utils/         # 优化: 扩展功能
├── color-utils/       # 保持
├── time-utils/        # 保持
├── crypto-utils/      # 保持
├── format-utils/      # 保持
├── fetch-utils/       # 保持
├── dom-utils/         # 保持
├── window-utils/      # 保持
├── state-utils/       # 保持
├── diff-utils/        # 保持
├── grid-utils/        # 保持
├── regexps/           # 保持
└── tree-utils/        # 保持
```

### 4.2 包依赖关系

```
fn-utils       → 无外部依赖 (纯函数)
async-utils    → fn-utils (依赖 debounce)
type-utils     → 无外部依赖 (纯函数)

其他包         → 保持现状
```

---

## 五、实施顺序

### Phase 1: 清理冗余 (低风险)

1. [ ] 删除 `object-utils.groupBy`
2. [ ] 删除 `object-utils.getNestedValue` (保留 get)
3. [ ] 删除 `string-utils.parseQuery` (保留 url-utils 版本)
4. [ ] 删除 `string-utils.buildQuery` (保留 url-utils 版本)
5. [ ] 更新相关测试

### Phase 2: 新增工具包

1. [ ] 创建 `fn-utils` 包
   - [ ] 实现 debounce, throttle
   - [ ] 实现 compose, pipe
   - [ ] 实现 curry, memoize, once
   - [ ] 编写测试
   - [ ] 编写文档

2. [ ] 创建 `async-utils` 包
   - [ ] 实现 sleep, retry, timeout
   - [ ] 编写测试
   - [ ] 编写文档

3. [ ] 创建 `type-utils` 包
   - [ ] 实现类型守卫函数
   - [ ] 编写测试
   - [ ] 编写文档

### Phase 3: 整合与优化 (可选)

1. [ ] 考虑合并 `window-utils` 到 `dom-utils`
2. [ ] 考虑合并 `fetch-utils` 下载功能到其他包
3. [ ] 统一代码风格和注释格式

---

## 六、兼容性考虑

### 6.1 破坏性变更

本次优化包含以下破坏性变更:

| 变更 | 影响 |
|------|------|
| 删除 `object-utils.groupBy` | 如有使用需迁移到 `array-utils.groupBy` |
| 删除 `object-utils.getNestedValue` | 改用 `object-utils.get` |
| 删除 `string-utils.parseQuery` | 改用 `url-utils.getAllParams` |
| 删除 `string-utils.buildQuery` | 改用 `url-utils.buildUrl` |

### 6.2 迁移指南

```typescript
// object-utils.groupBy → array-utils.groupBy
import { groupBy } from '@utils/array-utils'

// object-utils.getNestedValue → object-utils.get
import { get } from '@utils/object-utils'
const value = get(obj, 'a.b.c')

// string-utils.parseQuery → url-utils.getAllParams
import { getAllParams } from '@utils/url-utils'
const params = getAllParams('?a=1&b=2')

// string-utils.buildQuery → url-utils.buildUrl
import { buildUrl } from '@utils/url-utils'
const url = buildUrl('https://example.com', { a: '1', b: '2' })
```

---

## 七、验收标准

1. **冗余函数已删除**: `object-utils` 和 `string-utils` 中无重复函数
2. **新包可用**: `fn-utils`, `async-utils`, `type-utils` 可正常安装使用
3. **测试通过**: 所有修改过的包测试通过
4. **类型安全**: 所有新函数有完整的 TypeScript 类型定义
5. **文档完整**: 每个新包有 README 和使用示例
