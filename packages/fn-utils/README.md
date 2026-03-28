# @zid-utils/fn-utils

> 函数式编程工具函数库 (Functional programming utility functions)

## 安装

```bash
pnpm add @zid-utils/fn-utils
```

## 概述

提供函数式编程工具函数，包括防抖、节流、函数组合、柯里化、记忆化等常用功能。

## 使用方法

```typescript
import {
  debounce,
  throttle,
  compose,
  pipe,
  curry,
  memoize,
  once,
  noop,
} from "@zid-utils/fn-utils";

// 防抖
const debouncedFn = debounce(() => {
  console.log('执行');
}, 300);

// 节流
const throttledFn = throttle(() => {
  console.log('执行');
}, 300);

// 函数组合
const process = pipe(
  (x: number) => x * 2,
  (x) => x + 1,
  String
);
process(5); // "11"

// 记忆化
const expensiveCalc = memoize((n: number) => n * n);
expensiveCalc(5); // 25 (计算)
expensiveCalc(5); // 25 (缓存)
```

## 函数详解

### noop

空函数，什么都不做。

```typescript
function noop(): void
```

**示例**:

```typescript
noop(); // 不执行任何操作
```

### once

确保函数只被调用一次。

```typescript
function once<T extends (...args: any[]) => any>(fn: T): T
```

**参数**:

- `fn`: 要包装的函数

**示例**:

```typescript
const init = once(() => {
  console.log('初始化');
});

init(); // 输出 "初始化"
init(); // 不输出
init(); // 不输出
```

### memoize

缓存函数结果，避免重复计算。

```typescript
function memoize<T extends (...args: any[]) => any>(fn: T): T
```

**参数**:

- `fn`: 要缓存的函数

**示例**:

```typescript
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(10); // 55 (计算)
fibonacci(10); // 55 (缓存)
```

### debounce

防抖函数，延迟执行，在延迟时间内多次调用只会执行一次。

```typescript
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void
```

**参数**:

- `fn`: 要防抖的函数
- `wait`: 延迟时间（毫秒）

**示例**:

```typescript
const handleSearch = debounce((query: string) => {
  console.log('搜索:', query);
}, 300);

handleSearch('a');
handleSearch('ab');
handleSearch('abc');
// 300ms 后只输出一次 "搜索: abc"
```

### throttle

节流函数，限制函数执行频率。

```typescript
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void
```

**参数**:

- `fn`: 要节流的函数
- `wait`: 间隔时间（毫秒）

**示例**:

```typescript
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100);

// 快速滚动时，每 100ms 最多执行一次
window.addEventListener('scroll', handleScroll);
```

### compose

函数组合，从右到左执行。

```typescript
function compose(...fns: AnyFunction[]): AnyFunction
```

**参数**:

- `fns`: 要组合的函数列表

**示例**:

```typescript
const double = (x: number) => x * 2;
const addOne = (x: number) => x + 1;
const square = (x: number) => x * x;

const process = compose(square, addOne, double);
process(3); // ((3 * 2) + 1) ^ 2 = 49
```

### pipe

函数组合，从左到右执行。

```typescript
function pipe(...fns: AnyFunction[]): AnyFunction
```

**参数**:

- `fns`: 要组合的函数列表

**示例**:

```typescript
const double = (x: number) => x * 2;
const addOne = (x: number) => x + 1;
const square = (x: number) => x * x;

const process = pipe(double, addOne, square);
process(3); // ((3 * 2) + 1) ^ 2 = 49
```

### curry

柯里化函数，将多参数函数转换为一元函数链。

```typescript
function curry<T extends AnyFunction>(
  fn: T,
  arity?: number
): AnyFunction
```

**参数**:

- `fn`: 要柯里化的函数
- `arity`: 函数参数个数（可选，默认使用函数 length）

**示例**:

```typescript
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6

// 常用场景：创建部分应用的函数
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
addOneAndTwo(3); // 6
```

## 实际应用示例

### 搜索输入防抖

```typescript
import { debounce } from "@zid-utils/fn-utils";

class SearchService {
  private search = debounce(async (query: string) => {
    const results = await this.fetchResults(query);
    this.displayResults(results);
  }, 300);

  onInput(query: string) {
    this.search(query);
  }
}
```

### 缓存 API 响应

```typescript
import { memoize } from "@zid-utils/fn-utils";

const fetchUser = memoize(async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});

// 同一用户 ID 只会请求一次
const user1 = await fetchUser('123');
const user1Again = await fetchUser('123'); // 使用缓存
```

### 数据处理管道

```typescript
import { pipe } from "@zid-utils/fn-utils";

const processOrder = pipe(
  (order: Order) => validateOrder(order),
  (order) => calculateDiscount(order),
  (order) => calculateTax(order),
  (order) => generateInvoice(order)
);

const invoice = processOrder(rawOrder);
```

### 事件处理节流

```typescript
import { throttle } from "@zid-utils/fn-utils";

class ResizeObserver {
  private onResize = throttle((entries: ResizeObserverEntry[]) => {
    this.handleResize(entries);
  }, 100);

  observe(element: HTMLElement) {
    // 监听 resize 事件
    window.addEventListener('resize', this.onResize);
  }
}
```

## License

MIT
