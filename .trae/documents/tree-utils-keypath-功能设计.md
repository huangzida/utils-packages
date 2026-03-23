# Tree-Utils 点路径搜索功能设计

**版本：** 1.0
**日期：** 2026-03-24
**状态：** 已确认

## 背景

用户需要扩展 tree-utils，增加基于点路径的节点搜索功能，并支持一些必要的辅助函数。

## 设计决策

### 1. 查找方式

**选择：** 基于 key 层级查找 + keyPath Map 优化

**理由：**
- 基于 key 层级：直接根据树结构查找，无需额外属性
- keyPath Map 优化：多次查询场景下可达 O(1) 复杂度

### 2. 路径格式

**格式：** 点分隔路径
```
'a.b.c' 表示 key='a' -> key='b' -> key='c'
```

### 3. 配置选项

```typescript
interface KeyPathOptions {
  /** 路径分隔符，默认 '.' */
  separator?: string;

  /** key 属性名，默认 'key' */
  keyKey?: string;

  /** children 属性名，默认 'children' */
  childrenKey?: string;

  /** 生成的 keyPath 属性名，默认 'keyPath' */
  keyPathKey?: string;
}
```

## 功能清单

### 查询类函数

#### 1. findByKeyPath

```typescript
/**
 * 根据 key 层级路径查找节点
 * @param treeData - 树形数据数组
 * @param keyPath - 路径字符串，如 'a.b.c'
 * @param options - 配置选项
 * @returns 找到的节点，未找到返回 null
 *
 * @example
 * ```typescript
 * const tree = [{
 *   key: 'a',
 *   children: [{
 *     key: 'b',
 *     children: [{ key: 'c' }]
 *   }]
 * }];
 * const node = findByKeyPath(tree, 'a.b.c');
 * // node = { key: 'c', ... }
 * ```
 */
function findByKeyPath(
  treeData: Record<string, any>[],
  keyPath: string,
  options?: KeyPathOptions
): Record<string, any> | null
```

#### 2. hasKeyPath

```typescript
/**
 * 检查路径是否存在
 */
function hasKeyPath(
  treeData: Record<string, any>[],
  keyPath: string,
  options?: KeyPathOptions
): boolean
```

#### 3. getKeyPathParts

```typescript
/**
 * 解析路径为数组
 * @example
 * ```typescript
 * getKeyPathParts('a.b.c') // ['a', 'b', 'c']
 * getKeyPathParts('a>b>c', { separator: '>' }) // ['a', 'b', 'c']
 * ```
 */
function getKeyPathParts(
  keyPath: string,
  separator?: string
): string[]
```

### 生成类函数

#### 4. autoGenerateKeyPath

```typescript
/**
 * 自动为每个节点生成 keyPath 属性
 * @returns 返回新的树数据（不修改原数据）
 *
 * @example
 * ```typescript
 * const tree = [{ key: 'a', children: [{ key: 'b' }] }];
 * const result = autoGenerateKeyPath(tree);
 * // result = [
 * //   { key: 'a', keyPath: 'a', children: [{ key: 'b', keyPath: 'a.b' }] }
 * // ]
 * ```
 */
function autoGenerateKeyPath(
  treeData: Record<string, any>[],
  options?: KeyPathOptions
): Record<string, any>[]
```

#### 5. buildKeyPathMap

```typescript
/**
 * 构建 keyPath 到节点的 Map（用于 O(1) 查询）
 * @example
 * ```typescript
 * const map = buildKeyPathMap(tree);
 * map.get('a.b.c') // O(1) 复杂度
 * ```
 */
function buildKeyPathMap(
  treeData: Record<string, any>[],
  options?: KeyPathOptions
): Map<string, Record<string, any>>
```

### 工具类函数

#### 6. joinKeyPath

```typescript
/**
 * 拼接路径片段
 * @example
 * ```typescript
 * joinKeyPath('a', 'b', 'c') // 'a.b.c'
 * joinKeyPath(['a', 'b'], { separator: '/' }) // 'a/b'
 * ```
 */
function joinKeyPath(
  ...parts: string[]
): string

function joinKeyPath(
  parts: string[],
  separator?: string
): string
```

#### 7. getParentKeyPath

```typescript
/**
 * 获取父路径
 * @example
 * ```typescript
 * getParentKeyPath('a.b.c') // 'a.b'
 * getParentKeyPath('a') // null
 * ```
 */
function getParentKeyPath(
  keyPath: string,
  separator?: string
): string | null
```

#### 8. getKeyPathDepth

```typescript
/**
 * 获取路径深度
 * @example
 * ```typescript
 * getKeyPathDepth('a.b.c') // 3
 * ```
 */
function getKeyPathDepth(
  keyPath: string,
  separator?: string
): number
```

## 使用示例

### 基础用法

```typescript
import { findByKeyPath, autoGenerateKeyPath } from '@zid-utils/tree-utils';

const tree = [
  {
    key: 'user',
    children: [
      {
        key: 'profile',
        children: [{ key: 'address', value: 'Beijing' }]
      }
    ]
  }
];

// 直接查找
const node = findByKeyPath(tree, 'user.profile.address');
console.log(node.value); // 'Beijing'
```

### 多次查询优化

```typescript
import { autoGenerateKeyPath, buildKeyPathMap } from '@zid-utils/tree-utils';

// 预处理
const treeWithPath = autoGenerateKeyPath(tree);
const map = buildKeyPathMap(treeWithPath);

// 多次查询 - O(1) 复杂度
const node1 = map.get('user.profile.address');
const node2 = map.get('user.profile');
const node3 = map.get('user');
```

### 自定义配置

```typescript
import { findByKeyPath, autoGenerateKeyPath } from '@zid-utils/tree-utils';

// 使用自定义分隔符
const tree = [{ id: 'a', children: [{ id: 'b' }] }];

findByKeyPath(tree, 'a>b', { separator: '>', keyKey: 'id' });

// 生成 keyPath
const result = autoGenerateKeyPath(tree, { separator: '/', keyKey: 'id' });
// [{ id: 'a', keyPath: 'a', children: [{ id: 'b', keyPath: 'a/b' }] }]
```

## 性能分析

| 函数 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|----------|
| findByKeyPath | O(d) | O(1) | 偶尔查询 |
| hasKeyPath | O(d) | O(1) | 偶尔查询 |
| autoGenerateKeyPath | O(n) | O(n) | 预处理 |
| buildKeyPathMap | O(n) | O(n) | 多次查询 |
| joinKeyPath | O(1) | O(1) | 工具函数 |
| getParentKeyPath | O(d) | O(1) | 工具函数 |

> d = 路径深度，n = 节点总数

## 文件结构

```
src/
├── query/
│   ├── findByKeyPath.ts      # 路径查找
│   ├── hasKeyPath.ts         # 路径存在检查
│   ├── index.ts              # 导出
├── path/
│   ├── getKeyPathParts.ts   # 解析路径
│   ├── joinKeyPath.ts       # 拼接路径
│   ├── getParentKeyPath.ts  # 获取父路径
│   ├── getKeyPathDepth.ts   # 获取路径深度
│   ├── autoGenerateKeyPath.ts  # 自动生成
│   ├── buildKeyPathMap.ts   # 构建 Map
│   ├── index.ts             # 导出
```

## 实施优先级

1. **核心函数（必须）**
   - findByKeyPath
   - getKeyPathParts
   - autoGenerateKeyPath

2. **辅助函数（推荐）**
   - hasKeyPath
   - buildKeyPathMap
   - getParentKeyPath
   - joinKeyPath
   - getKeyPathDepth

## 测试用例

### findByKeyPath

```typescript
describe('findByKeyPath', () => {
  const tree = [
    {
      key: 'a',
      children: [{ key: 'b', children: [{ key: 'c' }] }]
    }
  ];

  it('应该找到深层节点', () => {
    const node = findByKeyPath(tree, 'a.b.c');
    expect(node.key).toBe('c');
  });

  it('找不到应该返回 null', () => {
    const node = findByKeyPath(tree, 'a.x');
    expect(node).toBeNull();
  });

  it('应该支持自定义分隔符', () => {
    const node = findByKeyPath(tree, 'a>b>c', { separator: '>' });
    expect(node.key).toBe('c');
  });
});
```

### autoGenerateKeyPath

```typescript
describe('autoGenerateKeyPath', () => {
  const tree = [
    { key: 'a', children: [{ key: 'b' }] }
  ];

  it('应该正确生成 keyPath', () => {
    const result = autoGenerateKeyPath(tree);
    expect(result[0].keyPath).toBe('a');
    expect(result[0].children[0].keyPath).toBe('a.b');
  });

  it('不应该修改原数据', () => {
    const original = [{ key: 'a' }];
    autoGenerateKeyPath(original);
    expect(original[0].keyPath).toBeUndefined();
  });
});
```

## 决策总结

| 决策项 | 选择 |
|--------|------|
| 查找方式 | 基于 key 层级 + keyPath Map 优化 |
| 路径格式 | 点分隔（可配置） |
| keyPath 生成 | 自动生成（可选） |
| 分隔符 | 支持自定义（默认 '.'） |
| 返回值 | 直接返回节点 |
