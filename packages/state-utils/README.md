# @zid-utils/state-utils

> 状态管理工具库 (State management utility library)

## 安装

```bash
pnpm add @zid-utils/state-utils
```

## 概述

提供轻量级的状态管理功能，支持条件验证、订阅更新、批量更新。适用于表单状态管理、组件间状态共享、小型应用状态管理。

## 使用方法

```typescript
import { StateHandler, createStateHandler } from "@zid-utils/state-utils";

// 创建状态处理器
const state = new StateHandler(0, (v) => v >= 0);

// 获取值
state.getValue(); // 0

// 设置值（需通过条件验证）
state.setValue(10);
state.getValue(); // 10

// 设置无效值会静默失败
state.setValue(-5); // 无效，被拒绝
state.getValue(); // 10

// 订阅状态变化
state.subscribe((value) => {
  console.log("State changed:", value);
});

// 更新值
state.update((prev) => prev + 1); // 触发订阅，值为 11
```

## StateHandler 类

### 构造函数

```typescript
new StateHandler<T>(initialValue: T, condition?: (value: T) => boolean)
```

**参数**:

- `initialValue`: 初始值
- `condition`: 可选的条件验证函数，值必须通过此函数验证才能设置

**示例**:

```typescript
// 无条件
const state1 = new StateHandler(0);

// 正数验证
const positiveState = new StateHandler(0, (v) => v > 0);

// 范围验证
const boundedState = new StateHandler(50, (v) => v >= 0 && v <= 100);

// 字符串长度验证
const nameState = new StateHandler("", (v) => v.length <= 50);
```

### getValue

获取当前值。

```typescript
getValue(): T
```

**示例**:

```typescript
const state = new StateHandler(42);
console.log(state.getValue()); // 42
```

### setValue

设置值（需通过条件验证）。

```typescript
setValue(value: T): void
```

**参数**:

- `value`: 要设置的新值
- 如果值不满足条件验证函数，设置为静默失败，不触发订阅

**示例**:

```typescript
const state = new StateHandler(0, (v) => v >= 0);

state.setValue(10); // 成功
console.log(state.getValue()); // 10

state.setValue(-5); // 失败，静默拒绝
console.log(state.getValue()); // 仍然是 10
```

### reset

重置状态并通知订阅者。

```typescript
reset(): void
```

**示例**:

```typescript
const state = new StateHandler(10);
state.update((v) => v + 1);
console.log(state.getValue()); // 11

state.reset(); // 重置为初始值
console.log(state.getValue()); // 10
```

### subscribe

订阅状态变化。

```typescript
subscribe(callback: (value: T) => void): () => void
```

**参数**:

- `callback`: 状态变化时的回调函数

**返回值**: 取消订阅函数，调用后取消订阅

**示例**:

```typescript
const state = new StateHandler(0);

const unsubscribe = state.subscribe((value) => {
  console.log("Updated:", value);
});

state.setValue(1); // 输出: "Updated: 1"
state.setValue(2); // 输出: "Updated: 2"

unsubscribe(); // 取消订阅

state.setValue(3); // 不输出（已取消订阅）
```

### update

通过更新函数更新值。

```typescript
update(updater: (value: T) => T): void
```

**参数**:

- `updater`: 更新函数，接收当前值，返回新值
- 新值必须通过条件验证，否则更新被静默拒绝

**示例**:

```typescript
const state = new StateHandler(0, (v) => v < 100);

state.update((v) => v + 1);
console.log(state.getValue()); // 1

state.update((v) => v + 10);
console.log(state.getValue()); // 11

// 尝试设置无效值会被拒绝
state.update((v) => v + 1000);
console.log(state.getValue()); // 仍然是 11
```

## 工厂函数

### createStateHandler

创建状态处理器实例的工厂函数。

```typescript
function createStateHandler<T>(
  initialValue: T,
  condition?: (value: T) => boolean
): StateHandler<T>
```

**示例**:

```typescript
const state = createStateHandler(0);
```

## 实际应用示例

### 表单状态管理

```typescript
import { StateHandler } from "@zid-utils/state-utils";

interface FormState {
  name: string;
  email: string;
  age: number;
}

const formState = new StateHandler<FormState>(
  { name: "", email: "", age: 0 },
  (form) => {
    const isNameValid = form.name.length >= 2 && form.name.length <= 50;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isAgeValid = form.age >= 0 && form.age <= 150;
    return isNameValid && isEmailValid && isAgeValid;
  }
);

// 订阅表单变化
formState.subscribe((form) => {
  console.log("表单已更新:", form);
});

// 更新表单字段
formState.update((prev) => ({
  ...prev,
  name: "张三",
}));

formState.update((prev) => ({
  ...prev,
  email: "zhang@example.com",
}));

// 获取当前表单状态
console.log(formState.getValue());
```

### 计数器

```typescript
import { StateHandler } from "@zid-utils/state-utils";

// 带边界限制的计数器
const counter = new StateHandler(0, (v) => v >= 0 && v <= 100);

// 订阅变化
counter.subscribe((count) => {
  console.log(`计数器: ${count}`);
});

// 增加
counter.update((c) => c + 1); // 1
counter.update((c) => c + 5); // 6

// 减少
counter.update((c) => c - 2); // 4

// 尝试超过上限
counter.update((c) => c + 100); // 被拒绝，保持 4

// 重置
counter.reset(); // 重置为 0
```

### 主题切换

```typescript
import { StateHandler } from "@zid-utils/state-utils";

type Theme = "light" | "dark" | "auto";

const themeState = new StateHandler<Theme>("auto");

// 订阅主题变化
themeState.subscribe((theme) => {
  document.body.setAttribute("data-theme", theme);
  console.log(`主题切换为: ${theme}`);
});

// 切换主题
themeState.setValue("dark");
themeState.setValue("light");
```

### 购物车

```typescript
import { StateHandler } from "@zid-utils/state-utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discount: number;
}

const cartState = new StateHandler<CartState>(
  { items: [], discount: 0 },
  (cart) => {
    const isQuantityValid = cart.items.every((item) => item.quantity >= 0);
    const isDiscountValid = cart.discount >= 0 && cart.discount <= 100;
    return isQuantityValid && isDiscountValid;
  }
);

// 添加商品
cartState.update((prev) => ({
  ...prev,
  items: [
    ...prev.items,
    { id: "1", name: "商品A", price: 100, quantity: 1 },
  ],
}));

// 更新数量
cartState.update((prev) => ({
  ...prev,
  items: prev.items.map((item) =>
    item.id === "1" ? { ...item, quantity: item.quantity + 1 } : item
  ),
}));

// 设置折扣
cartState.update((prev) => ({
  ...prev,
  discount: 10,
}));

// 计算总价
const total = cartState.getValue().items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const discountedTotal = total * (1 - cartState.getValue().discount / 100);
console.log(`总价: ${discountedTotal}`);
```

### 数据加载状态

```typescript
import { StateHandler } from "@zid-utils/state-utils";

type LoadingState = "idle" | "loading" | "success" | "error";

const loadingState = new StateHandler<LoadingState>("idle");

loadingState.subscribe((state) => {
  const spinner = document.getElementById("spinner");
  const error = document.getElementById("error");

  switch (state) {
    case "loading":
      spinner?.classList.remove("hidden");
      error?.classList.add("hidden");
      break;
    case "success":
      spinner?.classList.add("hidden");
      error?.classList.add("hidden");
      break;
    case "error":
      spinner?.classList.add("hidden");
      error?.classList.remove("hidden");
      break;
    default:
      spinner?.classList.add("hidden");
      error?.classList.add("hidden");
  }
});

async function fetchData() {
  loadingState.setValue("loading");

  try {
    await fetch("/api/data");
    loadingState.setValue("success");
  } catch (error) {
    loadingState.setValue("error");
  }
}
```

### 多状态管理

```typescript
import { createStateHandler } from "@zid-utils/state-utils";

// 创建多个独立的状态
const userName = createStateHandler("");
const userAge = createStateHandler(0, (v) => v >= 0);
const isLoggedIn = createStateHandler(false);

// 订阅各个状态
userName.subscribe((name) => console.log(`Name: ${name}`));
userAge.subscribe((age) => console.log(`Age: ${age}`));
isLoggedIn.subscribe((logged) => console.log(`Logged in: ${logged}`));

// 更新状态
userName.setValue("张三");
userAge.setValue(28);
isLoggedIn.setValue(true);
```

## 类型定义

```typescript
class StateHandler<T> {
  constructor(initialValue: T, condition?: (value: T) => boolean);

  getValue(): T;
  setValue(value: T): void;
  reset(): void;
  subscribe(callback: (value: T) => void): () => void;
  update(updater: (value: T) => T): void;
}

function createStateHandler<T>(
  initialValue: T,
  condition?: (value: T) => boolean
): StateHandler<T>;
```

## 最佳实践

1. **条件验证**: 使用条件函数防止无效状态
2. **订阅清理**: 在组件卸载时取消订阅
3. **不可变性**: 使用 `update` 方法保证状态不可变性
4. **类型安全**: 充分利用 TypeScript 类型系统

**正确的订阅清理**:

```typescript
const state = new StateHandler(0);

const unsubscribe = state.subscribe((value) => {
  console.log(value);
});

// 组件卸载时
unsubscribe();
```

**错误的方式**（内存泄漏）:

```typescript
const state = new StateHandler(0);

// 在组件中直接订阅，组件卸载时不取消
state.subscribe((value) => {
  console.log(value);
});
```

## License

MIT
