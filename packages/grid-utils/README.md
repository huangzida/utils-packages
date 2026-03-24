# @zid-utils/grid-utils

> 二维数组(网格)操作工具库 (Grid/Two-dimensional array manipulation library)

## 安装

```bash
pnpm add @zid-utils/grid-utils
```

## 概述

提供二维网格数组的操作功能，适用于游戏开发、数据表格编辑、图像处理等场景。

## 使用方法

```typescript
import { updateGridElement } from "@zid-utils/grid-utils";

const grid = [
  [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
  ],
  [
    { id: 3, name: "c" },
    { id: 4, name: "d" },
  ],
];

const updatedGrid = updateGridElement(
  grid,
  (el) => el.id === 2,
  (el) => ({ ...el, name: "updated" })
);

console.log(updatedGrid);
// [
//   [{ id: 1, name: "a" }, { id: 2, name: "updated" }],
//   [{ id: 3, name: "c" }, { id: 4, name: "d" }]
// ]
```

## 函数详解

### updateGridElement

更新网格中符合条件的元素，返回新的网格数组（不修改原数组）。

```typescript
function updateGridElement<T>(
  grid: T[][],
  matcher: (element: T) => boolean,
  updater: (element: T) => T
): T[][]
```

**参数**:

- `grid`: 二维网格数组
- `matcher`: 匹配函数，用于查找需要更新的元素
- `updater`: 更新函数，返回更新后的元素

**返回值**: 新的网格数组

**示例**:

```typescript
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// 更新值为 5 的元素
const result = updateGridElement(
  grid,
  (el) => el === 5,
  (el) => el * 10
);

console.log(result);
// [
//   [1, 2, 3],
//   [4, 50, 6],
//   [7, 8, 9]
// ]
```

## 实际应用示例

### 游戏网格更新

```typescript
import { updateGridElement } from "@zid-utils/grid-utils";

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  revealed: boolean;
  adjacentMines: number;
}

// 创建游戏网格
const grid: Cell[][] = Array.from({ length: 5 }, (_, y) =>
  Array.from({ length: 5 }, (_, x) => ({
    x,
    y,
    isMine: false,
    revealed: false,
    adjacentMines: 0,
  }))
);

// 标记某个格子为已揭示
const revealedGrid = updateGridElement(
  grid,
  (cell) => cell.x === 2 && cell.y === 3,
  (cell) => ({ ...cell, revealed: true })
);

// 检查原网格未被修改
console.log(grid[3][2].revealed); // false
console.log(revealedGrid[3][2].revealed); // true
```

### 数据表格编辑

```typescript
import { updateGridElement } from "@zid-utils/grid-utils";

interface TableCell {
  id: string;
  value: string;
  editable: boolean;
}

const table: TableCell[][] = [
  [
    { id: "1", value: "张三", editable: true },
    { id: "2", value: "28", editable: true },
  ],
  [
    { id: "3", value: "李四", editable: true },
    { id: "4", value: "32", editable: true },
  ],
];

// 更新名字
const updatedTable = updateGridElement(
  table,
  (cell) => cell.id === "1",
  (cell) => ({ ...cell, value: "张小三" })
);

console.log(updatedTable[0][0].value); // "张小三"
```

### 图像像素操作

```typescript
import { updateGridElement } from "@zid-utils/grid-utils";

interface Pixel {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

// 创建简单的像素网格
const image: Pixel[][] = Array.from({ length: 3 }, (_, y) =>
  Array.from({ length: 3 }, (_, x) => ({
    x,
    y,
    r: 255,
    g: 0,
    b: 0,
  }))
);

// 将中心像素变为绿色
const modifiedImage = updateGridElement(
  image,
  (pixel) => pixel.x === 1 && pixel.y === 1,
  (pixel) => ({ ...pixel, r: 0, g: 255, b: 0 })
);
```

### 批量更新

```typescript
import { updateGridElement } from "@zid-utils/grid-utils";

const grid = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

// 依次更新多个元素
let result = grid;

// 将所有偶数翻倍
result = updateGridElement(
  result,
  (el) => el % 2 === 0,
  (el) => el * 2
);

console.log(result);
// [
//   [1, 4, 3, 8],
//   [5, 12, 7, 16],
//   [9, 20, 11, 24]
// ]
```

## 性能说明

`updateGridElement` 使用了以下优化策略：

1. **浅拷贝**: 只拷贝包含匹配元素的行，其他行保持原引用
2. **短路机制**: 找到匹配元素后立即停止搜索
3. **函数式设计**: 不修改原数组，保证不可变性

## License

MIT
