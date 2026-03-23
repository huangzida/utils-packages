# ⚡ Utils Packages

Monorepo for TypeScript utility packages extracted from xpanel-browser-umi4. Each package is self-contained and published to npm independently.

[![pnpm](https://img.shields.io/badge/pnpm-9.0.0+-blue.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)

## 📦 Packages

| Package                                                | Version                                                                                                                   | Description                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [@zid-utils/regexps](./packages/regexps)               | [![npm](https://img.shields.io/npm/v/@zid-utils/regexps)](https://www.npmjs.com/package/@zid-utils/regexps)               | 常用正则表达式验证器         |
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
| [@zid-utils/download-utils](./packages/download-utils) | [![npm](https://img.shields.io/npm/v/@zid-utils/download-utils)](https://www.npmjs.com/package/@zid-utils/download-utils) | 文件下载工具                 |

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
- **数组操作** - 去重、分组、排序、洗牌等
- **对象操作** - 深拷贝、深度合并、属性选择等
- **字符串操作** - 大小写转换、HTML转义、模板等
- **URL 操作** - 参数解析、域名提取等
- **格式化** - 数字、货币、百分比格式化
- **颜色转换** - HEX/RGB/HSL 相互转换
- **差异比较** - 对象深比较、差异计算
- **状态管理** - 响应式状态处理器
- **文件下载** - URL/Blob/Base64 下载

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
pnpm add @zid-utils/download-utils
```

### 使用示例

#### Regexps - 正则验证

```typescript
import {
  isEmail,
  isUrl,
  isPhone,
  isIdCard,
  isChinese,
} from "@zid-utils/regexps";

isEmail("test@example.com"); // true
isUrl("https://example.com"); // true
isPhone("13812345678"); // true
isIdCard("110101199003074519"); // true
isChinese("你好"); // true
```

#### Time Utils - 时间格式化

```typescript
import { padZero, formatTime, formatTimeDetail } from "@zid-utils/time-utils";

padZero(5, 3); // "005"
formatTime(3661); // "01:01:01"
formatTimeDetail(90061); // { hours: "01", minutes: "01", seconds: "01", displayTime: "01:01:01" }
```

#### Tree Utils - 树形操作

```typescript
import {
  findNodeByKey,
  getLeafNodes,
  searchInTree,
  deleteNode,
  flattenTree,
  transformTreeKeys,
} from "@zid-utils/tree-utils";

const tree = [
  {
    key: "1",
    title: "Root",
    children: [{ key: "1-1", title: "Child", isLeaf: true }],
  },
];

findNodeByKey(tree, "1-1"); // 查找节点
getLeafNodes(tree); // 获取所有叶子节点
searchInTree(tree, "Child"); // 搜索节点
deleteNode(tree, "1-1"); // 删除节点
flattenTree(tree); // 平铺为数组
transformTreeKeys(tree, { key: "id" }); // 转换键名
```

#### Grid Utils - 网格操作

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

updateGridElement(
  grid,
  (el) => el.id === 2,
  (el) => ({ ...el, name: "updated" }),
);
```

#### DOM Utils - DOM 操作

```typescript
import {
  getElementVisibleRect,
  getScrollbarWidth,
  needsScrollbar,
} from "@zid-utils/dom-utils";

const rect = await getElementVisibleRect(element);
const width = getScrollbarWidth();
const hasScrollbar = needsScrollbar(container);
```

#### Window Utils - 窗口操作

```typescript
import {
  openWindow,
  closeWindow,
  getWindowSize,
  scrollToTop,
} from "@zid-utils/window-utils";

const size = getWindowSize();
openWindow("https://example.com");
scrollToTop();
```

#### Crypto Utils - 加解密

```typescript
import { encrypt, decrypt, createCrypto } from "@zid-utils/crypto-utils";

// 方式一：直接调用
encrypt("data", { key: "your-16-char-key", iv: "your-16-char-iv" });
decrypt("ciphertext", { key: "your-16-char-key", iv: "your-16-char-iv" });

// 方式二：创建可复用实例
const crypto = createCrypto({ key: "your-16-char-key", iv: "your-16-char-iv" });
crypto.encrypt("data");
crypto.decrypt("ciphertext");
```

> ⚠️ **安全提示**: key 和 iv 必须都是 16 字符。建议从环境变量读取，不要硬编码在代码中。

## 🛠️ Development

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建所有包
pnpm build

# 格式化代码
pnpm format

# 代码检查
pnpm lint
```

## 📝 Publishing

本项目使用 [changesets](https://github.com/changesets/changesets) 管理版本和发布。

### 发布流程

1. 修改代码后，创建 changeset 文件：

```bash
pnpm changeset
```

2. 选择要发布的包和版本类型（patch/minor/major）

3. 提交代码并合并到 main 分支

4. GitHub Actions 会自动发布到 npm

### 手动发布

```bash
pnpm release
```

## 📂 项目结构

```
utils-packages/
├── packages/
│   ├── array-utils/      # 数组操作
│   ├── color-utils/      # 颜色转换
│   ├── crypto-utils/     # AES 加密解密
│   ├── diff-utils/       # 对象差异比较
│   ├── dom-utils/        # DOM 操作
│   ├── download-utils/   # 文件下载
│   ├── format-utils/     # 格式化工具
│   ├── grid-utils/       # 网格操作
│   ├── object-utils/     # 对象操作
│   ├── regexps/          # 正则验证
│   ├── state-utils/      # 状态管理
│   ├── string-utils/     # 字符串操作
│   ├── time-utils/       # 时间处理
│   ├── tree-utils/       # 树形数据
│   ├── url-utils/        # URL 操作
│   └── window-utils/     # 窗口操作
├── index.html            # 交互式 Playground
├── package.json          # Workspace 配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
└── .changeset/           # Changesets 配置
```

## 📄 License

MIT
