# @zid-utils/array-utils

> 数组操作工具函数库 (Array manipulation utility functions)

## 安装

```bash
pnpm add @zid-utils/array-utils
```

## 概述

提供丰富的数组操作函数，包括去重、分组、排序、洗牌、抽样、分块等常用功能。

## 使用方法

```typescript
import {
  unique,
  uniqueByField,
  chunk,
  groupBy,
  sortBy,
  shuffle,
} from "@zid-utils/array-utils";

// 去重
unique([1, 2, 2, 3]); // [1, 2, 3]

// 按字段去重
uniqueByField(
  [{ a: 1 }, { a: 2 }, { a: 1 }],
  "a"
); // [{ a: 1 }, { a: 2 }]

// 分块
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// 分组
groupBy([{ type: "a", val: 1 }, { type: "b", val: 2 }], (item) => item.type);
// { a: [{ type: "a", val: 1 }], b: [{ type: "b", val: 2 }] }

// 排序
sortBy([{ n: 3 }, { n: 1 }, { n: 2 }], "n"); // [{ n: 1 }, { n: 2 }, { n: 3 }]

// 洗牌
shuffle([1, 2, 3, 4, 5]); // 随机排列
```

## 函数详解

### unique

数组去重。

```typescript
function unique<T>(arr: T[]): T[]
```

**参数**:
- `arr`: 原数组

**返回值**: 去重后的新数组

**示例**:

```typescript
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
unique(["a", "b", "a"]); // ["a", "b"]
```

### uniqueByField

根据指定字段去重。

```typescript
function uniqueByField<T>(arr: T[], key: keyof T): T[]
```

**参数**:

- `arr`: 对象数组
- `key`: 用于去重的字段名

**示例**:

```typescript
const items = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
  { id: 1, name: "张三" },
];

uniqueByField(items, "id");
// [{ id: 1, name: "张三" }, { id: 2, name: "李四" }]
```

### chunk

将数组分块。

```typescript
function chunk<T>(arr: T[], size: number): T[][]
```

**参数**:

- `arr`: 原数组
- `size`: 每块的大小

**示例**:

```typescript
chunk([1, 2, 3, 4, 5, 6, 7], 3);
// [[1, 2, 3], [4, 5, 6], [7]]

chunk(["a", "b", "c", "d"], 2);
// [["a", "b"], ["c", "d"]]
```

### groupBy

按键函数分组。

```typescript
function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string | number
): Record<string | number, T[]>
```

**参数**:

- `arr`: 原数组
- `keyFn`: 返回分组的键的函数

**示例**:

```typescript
const products = [
  { category: "electronics", name: "手机" },
  { category: "electronics", name: "电脑" },
  { category: "clothing", name: "T恤" },
];

groupBy(products, (p) => p.category);
// {
//   electronics: [
//     { category: "electronics", name: "手机" },
//     { category: "electronics", name: "电脑" }
//   ],
//   clothing: [{ category: "clothing", name: "T恤" }]
// }
```

### flatten

递归扁平化嵌套数组。

```typescript
function flatten<T>(arr: (T | T[])[]): T[]
```

**示例**:

```typescript
flatten([1, [2, 3], [4, [5, 6]]]);
// [1, 2, 3, 4, 5, 6]
```

### difference

返回存在于第一个但不在第二个数组的元素（差集）。

```typescript
function difference<T>(arr1: T[], arr2: T[]): T[]
```

**示例**:

```typescript
difference([1, 2, 3, 4], [2, 4]);
// [1, 3]

difference(["a", "b", "c"], ["b"]);
// ["a", "c"]
```

### intersection

返回两个数组的交集。

```typescript
function intersection<T>(arr1: T[], arr2: T[]): T[]
```

**示例**:

```typescript
intersection([1, 2, 3, 4], [2, 4, 6]);
// [2, 4]
```

### sortBy

按键函数排序。

```typescript
function sortBy<T>(
  arr: T[],
  keyFn: (item: T) => number | string,
  order?: "asc" | "desc"
): T[]
```

**参数**:

- `arr`: 原数组
- `keyFn`: 返回排序键的函数
- `order`: 排序顺序，默认 `"asc"`（升序）

**示例**:

```typescript
const users = [
  { name: "张三", age: 28 },
  { name: "李四", age: 24 },
  { name: "王五", age: 32 },
];

// 按年龄升序
sortBy(users, (u) => u.age);
// [{ name: "李四", age: 24 }, { name: "张三", age: 28 }, { name: "王五", age: 32 }]

// 按年龄降序
sortBy(users, (u) => u.age, "desc");
// [{ name: "王五", age: 32 }, { name: "张三", age: 28 }, { name: "李四", age: 24 }]
```

### shuffle

Fisher-Yates 洗牌算法随机打乱数组。

```typescript
function shuffle<T>(arr: T[]): T[]
```

**返回值**: 随机排列的新数组

**示例**:

```typescript
shuffle([1, 2, 3, 4, 5]);
// [3, 1, 5, 2, 4] (随机)

// 洗牌后不影响原数组
const original = [1, 2, 3];
const shuffled = shuffle(original);
console.log(original); // [1, 2, 3] (不变)
console.log(shuffled); // [2, 1, 3] (随机)
```

### zip

合并两个数组为元组数组。

```typescript
function zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][]
```

**示例**:

```typescript
zip([1, 2, 3], ["a", "b", "c"]);
// [[1, "a"], [2, "b"], [3, "c"]]

// 长度不同时，取较短的长度
zip([1, 2], ["a", "b", "c"]);
// [[1, "a"], [2, "b"]]
```

### partition

按谓词分区数组。

```typescript
function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean
): [T[], T[]]
```

**参数**:

- `arr`: 原数组
- `predicate`: 判断函数

**返回值**: `[符合条件数组, 不符合条件数组]`

**示例**:

```typescript
const numbers = [1, 2, 3, 4, 5, 6];

partition(numbers, (n) => n % 2 === 0);
// [[2, 4, 6], [1, 3, 5]]

const [even, odd] = partition(numbers, (n) => n % 2 === 0);
```

### sample

随机抽取数组元素。

```typescript
function sample<T>(arr: T[], count?: number): T[]
```

**参数**:

- `arr`: 原数组
- `count`: 抽取数量，不指定则随机返回 1 个

**示例**:

```typescript
const items = ["苹果", "香蕉", "橙子", "葡萄"];

// 随机抽取 1 个
sample(items); // "香蕉"

// 随机抽取 2 个
sample(items, 2); // ["苹果", "葡萄"]

// 随机抽取全部（打乱）
sample(items, items.length);
```

### range

生成数字序列。

```typescript
function range(start: number, end: number, step?: number): number[]
```

**参数**:

- `start`: 起始值（包含）
- `end`: 结束值（不包含）
- `step`: 步长，默认 1

**示例**:

```typescript
range(0, 5); // [0, 1, 2, 3, 4]
range(1, 10, 2); // [1, 3, 5, 7, 9]
range(10, 0, -2); // [10, 8, 6, 4, 2]
```

## 实际应用示例

### 分页处理

```typescript
import { chunk } from "@zid-utils/array-utils";

function paginate<T>(arr: T[], page: number, pageSize: number): T[] {
  const chunks = chunk(arr, pageSize);
  return chunks[page - 1] || [];
}

const items = Array.from({ length: 100 }, (_, i) => i + 1);
const page1 = paginate(items, 1, 10); // [1, 2, 3, ..., 10]
const page2 = paginate(items, 2, 10); // [11, 12, 13, ..., 20]
```

### 数据分类统计

```typescript
import { groupBy, uniqueByField } from "@zid-utils/array-utils";

interface Student {
  name: string;
  class: string;
  score: number;
}

const students: Student[] = [
  { name: "张三", class: "A", score: 85 },
  { name: "李四", class: "B", score: 92 },
  { name: "王五", class: "A", score: 78 },
  { name: "赵六", class: "B", score: 88 },
];

// 按班级分组
const byClass = groupBy(students, (s) => s.class);

// 获取不重复的班级列表
const classes = uniqueByField(students, "class");
// [{ name: "张三", class: "A", score: 85 }, { name: "李四", class: "B", score: 92 }]
```

### 排行榜排序

```typescript
import { sortBy, unique } from "@zid-utils/array-utils";

interface Player {
  name: string;
  score: number;
  time: number;
}

const players: Player[] = [
  { name: "张三", score: 1000, time: 300 },
  { name: "李四", score: 1200, time: 350 },
  { name: "王五", score: 1000, time: 280 },
];

// 按分数降序排序，同分按时间升序
const leaderboard = sortBy(
  [...players],
  (p) => [-p.score, p.time]
);
// [
//   { name: "王五", score: 1000, time: 280 },
//   { name: "张三", score: 1000, time: 300 },
//   { name: "李四", score: 1200, time: 350 }
// ]
```

### 随机抽奖

```typescript
import { sample } from "@zid-utils/array-utils";

interface Prize {
  name: string;
  count: number;
}

function drawPrizes(prizes: Prize[], totalWinners: number) {
  const winners: string[] = [];

  for (const prize of prizes) {
    const prizeWinners = sample(
      prizes.flatMap((p) => Array(p.count).fill(p.name)),
      Math.min(prize.count, totalWinners - winners.length)
    );
    winners.push(...prizeWinners);
  }

  return winners;
}

const prizes: Prize[] = [
  { name: "一等奖", count: 1 },
  { name: "二等奖", count: 5 },
  { name: "三等奖", count: 10 },
];

const winners = drawPrizes(prizes, 10);
console.log(winners);
```

### 矩阵转置

```typescript
import { zip } from "@zid-utils/array-utils";

function transpose<T>(matrix: T[][]): T[][] {
  if (matrix.length === 0) return [];
  return zip(...matrix);
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
];

transpose(matrix);
// [[1, 4], [2, 5], [3, 6]]
```

## License

MIT
