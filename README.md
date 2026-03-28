# ⚡ Utils Packages

Monorepo for TypeScript utility packages. Each package is self-contained and published to npm independently.

[![pnpm](https://img.shields.io/badge/pnpm-9.0.0+-blue.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)

## 📦 Packages

| Package                                              | Version                                                                                                                   | Description                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [@zid-utils/regexps](./packages/regexps)             | [![npm](https://img.shields.io/npm/v/@zid-utils/regexps)](https://www.npmjs.com/package/@zid-utils/regexps)               | 常用正则表达式验证器         |
| [@zid-utils/time-utils](./packages/time-utils)         | [![npm](https://img.shields.io/npm/v/@zid-utils/time-utils)](https://www.npmjs.com/package/@zid-utils/time-utils)         | 时间格式化工具函数           |
| [@zid-utils/tree-utils](./packages/tree-utils)         | [![npm](https://img.shields.io/npm/v/@zid-utils/tree-utils)](https://www.npmjs.com/package/@zid-utils/tree-utils)         | 树形数据结构操作             |
| [@zid-utils/grid-utils](./packages/grid-utils)         | [![npm](https://img.shields.io/npm/v/@zid-utils/grid-utils)](https://www.npmjs.com/package/@zid-utils/grid-utils)         | 二维数组(网格)操作           |
| [@zid-utils/dom-utils](./packages/dom-utils)           | [![npm](https://img.shields.io/npm/v/@zid-utils/dom-utils)](https://www.npmjs.com/package/@zid-utils/dom-utils)           | DOM 元素可见区域、滚动条检测 |
| [@zid-utils/window-utils](./packages/window-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/window-utils)](https://www.npmjs.com/package/@zid-utils/window-utils)     | 窗口操作、尺寸获取、滚动控制 |
| [@zid-utils/crypto-utils](./packages/crypto-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/crypto-utils)](https://www.npmjs.com/package/@zid-utils/crypto-utils)     | AES 加密解密工具             |
| [@zid-utils/array-utils](./packages/array-utils)       | [![npm](https://img.shields.io/npm/v/@zid-utils/array-utils)](https://www.npmjs.com/package/@zid-utils/array-utils)       | 数组操作工具函数             |
| [@zid-utils/object-utils](./packages/object-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/object-utils)](https://www.npmjs.com/package/@zid-utils/object-utils)     | 对象操作工具函数             |
| [@zid-utils/string-utils](./packages/string-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/string-utils)](https://www.npmjs.com/package/@zid-utils/string-utils)     | 字符串操作工具函数           |
| [@zid-utils/url-utils](./packages/url-utils)           | [![npm](https://img.shields.io/npm/v/@zid-utils/url-utils)](https://www.npmjs.com/package/@zid-utils/url-utils)           | URL 操作工具函数             |
| [@zid-utils/format-utils](./packages/format-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/format-utils)](https://www.npmjs.com/package/@zid-utils/format-utils)     | 数字、货币、百分比格式化     |
| [@zid-utils/color-utils](./packages/color-utils)       | [![npm](https://img.shields.io/npm/v/@zid-utils/color-utils)](https://www.npmjs.com/package/@zid-utils/color-utils)       | 颜色转换工具函数             |
| [@zid-utils/diff-utils](./packages/diff-utils)         | [![npm](https://img.shields.io/npm/v/@zid-utils/diff-utils)](https://www.npmjs.com/package/@zid-utils/diff-utils)         | 对象差异比较工具             |
| [@zid-utils/state-utils](./packages/state-utils)       | [![npm](https://img.shields.io/npm/v/@zid-utils/state-utils)](https://www.npmjs.com/package/@zid-utils/state-utils)       | 状态管理工具                 |
| [@zid-utils/fetch-utils](./packages/fetch-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/fetch-utils)](https://www.npmjs.com/package/@zid-utils/fetch-utils)     | 文件获取工具                 |
| [@zid-utils/fn-utils](./packages/fn-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/fn-utils)](https://www.npmjs.com/package/@zid-utils/fn-utils)     | 函数式编程工具                 |
| [@zid-utils/async-utils](./packages/async-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/async-utils)](https://www.npmjs.com/package/@zid-utils/async-utils)     | 异步操作工具                 |
| [@zid-utils/type-utils](./packages/type-utils)     | [![npm](https://img.shields.io/npm/v/@zid-utils/type-utils)](https://www.npmjs.com/package/@zid-utils/type-utils)     | 类型守卫工具                 |

## 🎮 Playground

提供了一个交互式 Playground 页面，方便调试和体验所有工具函数。

### 运行 Playground

```bash
pnpm preview
```

然后访问 http://localhost:3000/index.html

### 功能预览

- **正则验证** - 邮箱、URL、IP、电话、身份证等常用验证
- **时间格式化** - 秒数转时间格式、补零等
- **树形操作** - 查找节点、搜索、过滤、转换等
- **网格操作** - 二维数组元素更新
- **DOM 操作** - 元素可见区域、滚动条检测
- **窗口操作** - 打开窗口、尺寸获取、滚动控制
- **加解密** - AES-CBC 模式加解密
- **数组操作** - 去重、分组、排序，洗牌等
- **对象操作** - 深拷贝、深度合并、属性选择等
- **字符串操作** - 大小写转换、HTML转义、模板等
- **URL 操作** - 参数解析、域名提取等
- **格式化** - 数字、货币、百分比格式化
- **颜色转换** - HEX/RGB/HSL 相互转换
- **差异比较** - 对象深比较、差异计算
- **状态管理** - 响应式状态处理器
- **文件获取** - URL/Blob/Base64 获取
- **函数式编程** - 防抖、节流、组合、柯里化、记忆化
- **异步操作** - 延迟、重试、超时、异步防抖
- **类型守卫** - 类型检查工具，支持 TypeScript 类型收窄

## 🚀 Quick Start

### 安装

```bash
# 安装所有包
pnpm install

# 或者单独安装某个包
pnpm add @zid-utils/regexps
pnpm add @zid-utils/time-utils
pnpm add @zid-utils/tree-utils
pnpm add @zid-utils/grid-utils
pnpm add @zid-utils/dom-utils
pnpm add @zid-utils/window-utils
pnpm add @zid-utils/crypto-utils
pnpm add @zid-utils/array-utils
pnpm add @zid-utils/object-utils
pnpm add @zid-utils/string-utils
pnpm add @zid-utils/url-utils
pnpm add @zid-utils/format-utils
pnpm add @zid-utils/color-utils
pnpm add @zid-utils/diff-utils
pnpm add @zid-utils/state-utils
pnpm add @zid-utils/fetch-utils
pnpm add @zid-utils/fn-utils
pnpm add @zid-utils/async-utils
pnpm add @zid-utils/type-utils
```

## 📖 使用示例

每个子包都提供详细的 API 文档和使用示例，请查看对应的 README：

### 数据验证

- [Regexps](./packages/regexps) - 常用正则表达式验证器

### 时间处理

- [Time Utils](./packages/time-utils) - 时间格式化工具

### 树形数据

- [Tree Utils](./packages/tree-utils) - 树形数据结构操作

### 网格操作

- [Grid Utils](./packages/grid-utils) - 二维数组操作

### 浏览器操作

- [DOM Utils](./packages/dom-utils) - DOM 元素可见区域、滚动条检测
- [Window Utils](./packages/window-utils) - 窗口操作、尺寸获取、滚动控制

### 数据加密

- [Crypto Utils](./packages/crypto-utils) - AES 加密解密、哈希计算

### 数组操作

- [Array Utils](./packages/array-utils) - 数组去重、分组、排序、洗牌等

### 对象操作

- [Object Utils](./packages/object-utils) - 深拷贝、深度合并、属性选择等

### 字符串操作

- [String Utils](./packages/string-utils) - 命名转换、HTML 转义、模板等

### URL 操作

- [URL Utils](./packages/url-utils) - URL 解析、参数处理、路径操作等

### 数据格式化

- [Format Utils](./packages/format-utils) - 数字、货币、百分比、文件大小格式化
- [Color Utils](./packages/color-utils) - 颜色格式转换、调整

### 数据比较

- [Diff Utils](./packages/diff-utils) - 对象深度比较、差异计算

### 状态管理

- [State Utils](./packages/state-utils) - 响应式状态处理器

### 文件下载

- [Fetch Utils](./packages/fetch-utils) - URL/Blob/Base64 文件下载

### 函数式编程

- [Fn Utils](./packages/fn-utils) - 防抖、节流、组合、柯里化、记忆化等

### 异步操作

- [Async Utils](./packages/async-utils) - 延迟、重试、超时、异步防抖等

### 类型守卫

- [Type Utils](./packages/type-utils) - 类型检查工具，支持 TypeScript 类型收窄

详细的使用示例、API 文档和最佳实践请查看各包的 README 文件。

## 🛠️ Development

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 构建所有包
pnpm build

# 格式化代码
pnpm format

# 代码检查
pnpm lint
```

## 📝 Publishing

本项目使用 [bumpp](https://github.com/antfu/bumpp) 管理版本和发布。

### 发布流程

1. 运行发布命令，选择要更新的包和版本：

```bash
pnpm release
```

2. bumpp 会自动：
   - 更新选中包的版本号
   - 创建 git commit
   - 创建 git tag
   - 推送 commit 和 tag 到 GitHub

3. GitHub Actions 会自动：
   - 安装依赖
   - 运行测试
   - 构建包
   - 发布到 npm
   - 生成 GitHub Release

## 📂 项目结构

```
utils-packages/
├── packages/
│   ├── array-utils/      # 数组操作
│   ├── async-utils/      # 异步操作
│   ├── color-utils/      # 颜色转换
│   ├── crypto-utils/     # AES 加密解密
│   ├── diff-utils/       # 对象差异比较
│   ├── dom-utils/        # DOM 操作
│   ├── fetch-utils/      # 文件获取
│   ├── fn-utils/         # 函数式编程
│   ├── format-utils/      # 格式化工具
│   ├── grid-utils/       # 网格操作
│   ├── object-utils/     # 对象操作
│   ├── regexps/          # 正则验证
│   ├── state-utils/      # 状态管理
│   ├── string-utils/     # 字符串操作
│   ├── time-utils/       # 时间处理
│   ├── tree-utils/       # 树形数据
│   ├── type-utils/       # 类型守卫
│   ├── url-utils/        # URL 操作
│   └── window-utils/     # 窗口操作
├── index.html            # 交互式 Playground
├── package.json          # Workspace 配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
└── .github/workflows/    # CI/CD 配置
```

## 📄 License

MIT
