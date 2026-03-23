# 代码审查和 TSDoc 添加计划

## 一、审查结果

### 1.1 业务相关函数（需移除）

| 包 | 函数/内容 | 问题 |
|----|----------|------|
| regexps | `baseValidMap`, `validOfMap` | 包含业务相关的 key 如 "lowcode.*", "onlyChinese", "onlyIdCard" 等 |
| tree-utils | 中文错误消息 | `moveNodeInTree` 中的中文错误信息 "源节点或目标节点不存在" |

### 1.2 需要添加 TSDoc 的包（共 16 个）

| 包 | 函数数 | 优先级 |
|----|--------|--------|
| array-utils | 14 | 🔴 高 |
| color-utils | 16 | 🔴 高 |
| crypto-utils | 15 | 🔴 高 |
| diff-utils | 4 | 🟡 中 |
| dom-utils | 4 | 🟡 中 |
| download-utils | 8 | 🔴 高 |
| format-utils | 14 | 🔴 高 |
| grid-utils | 1 | 🟡 中 |
| object-utils | 20 | 🔴 高 |
| regexps | 17+ | 🟡 中 |
| state-utils | 2 | 🟡 中 |
| string-utils | 28 | 🔴 高 |
| time-utils | 4 | 🟡 中 |
| tree-utils | 30+ | 🔴 高 |
| url-utils | 17 | 🔴 高 |
| window-utils | 10 | 🟡 中 |

---

## 二、实施步骤

### Step 1: 移除业务相关函数

#### 1. regexps - 移除 baseValidMap 和 validOfMap
- 移除 `validOfMap` 函数
- 移除 `baseValidMap` 常量
- 移除相关类型 `ValidationItem`

#### 2. tree-utils - 移除中文错误消息
- 将 "源节点或目标节点不存在" 改为英文
- 将 "源节点不是叶子节点，无法直接移动" 改为英文

### Step 2: 为所有包添加 TSDoc

#### 高优先级包（函数多，使用频繁）
1. **tree-utils** - 30+ 函数
2. **string-utils** - 28 函数
3. **object-utils** - 20 函数
4. **crypto-utils** - 15 函数
5. **format-utils** - 14 函数
6. **array-utils** - 14 函数
7. **url-utils** - 17 函数
8. **color-utils** - 16 函数
9. **download-utils** - 8 函数

#### 中优先级包
10. **regexps** - 17+ 正则 + validOfMap
11. **dom-utils** - 4 函数
12. **diff-utils** - 4 函数
13. **state-utils** - 2 函数
14. **window-utils** - 10 函数
15. **time-utils** - 4 函数
16. **grid-utils** - 1 函数

### Step 3: 更新 README

- 更新各包的描述
- 添加 TSDoc 使用说明

---

## 三、执行顺序

```
1. 移除 regexps 中的 baseValidMap 和 validOfMap
2. 移除 tree-utils 中的中文错误消息
3. 为所有包添加 TSDoc（按优先级顺序）
4. 更新 README
5. 运行测试验证
6. 提交更改
```

---

## 四、TSDoc 模板

```typescript
/**
 * 函数简短描述
 * @param paramName - 参数描述
 * @returns 返回值描述
 * @example
 * ```typescript
 * example();
 * ```
 */
export function example(param: string): string { }
```

---

## 五、预期结果

- 移除所有业务相关函数和消息
- 所有 16 个包的函数都有完整的 TSDoc 注释
- README 更新完成
- 所有测试通过
