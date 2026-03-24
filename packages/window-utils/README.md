# @zid-utils/window-utils

> 窗口操作、尺寸获取、滚动控制工具库 (Window operations, size detection, and scroll control utilities)

## 安装

```bash
pnpm add @zid-utils/window-utils
```

## 概述

提供窗口操作和浏览器环境相关的工具函数，包括打开/关闭窗口、获取窗口尺寸、滚动控制、页面导航等功能。

## 使用方法

```typescript
import {
  openWindow,
  closeWindow,
  focusWindow,
  getWindowSize,
  scrollToTop,
  scrollToBottom,
  reload,
  replaceLocation,
} from "@zid-utils/window-utils";

// 打开新窗口
const win = openWindow("https://example.com");

// 获取窗口尺寸
const size = getWindowSize();
console.log(`窗口尺寸: ${size.width}x${size.height}`);

// 滚动到顶部
scrollToTop();

// 刷新页面
reload();

// 替换当前页面 URL
replaceLocation("/new-page");
```

## 函数详解

### openWindow

打开新窗口。

```typescript
function openWindow(
  url: string,
  options?: OpenWindowOptions
): Window | null
```

**参数**:

- `url`: 目标 URL
- `options`: 可选配置
  - `noopener?: boolean` - 是否禁用 opener（默认 `true`）
  - `noreferrer?: boolean` - 是否禁用 referrer（默认 `true`）
  - `target?: string` - 打开目标（默认 `"_blank"`）
  - `width?: number` - 窗口宽度（默认 `600`）
  - `height?: number` - 窗口高度（默认 `400`）
  - `left?: number` - 窗口左边距
  - `top?: number` - 窗口上边距

**返回值**: 新窗口对象，失败返回 `null`

**示例**:

```typescript
// 基础用法
const win = openWindow("https://example.com");

// 自定义尺寸和位置
const win = openWindow("https://example.com", {
  width: 800,
  height: 600,
  left: 100,
  top: 100,
});

// 在指定位置打开
const win = openWindow("popup.html", {
  target: "_blank",
  width: 500,
  height: 400,
});
```

### closeWindow

关闭当前窗口（仅在由脚本打开的窗口上有效）。

```typescript
function closeWindow(): void
```

**示例**:

```typescript
// 关闭由脚本打开的窗口
closeWindow();
```

### focusWindow

聚焦窗口。

```typescript
function focusWindow(): void
```

**示例**:

```typescript
// 聚焦到当前窗口
focusWindow();
```

### isWindowFocused

检查窗口是否聚焦。

```typescript
function isWindowFocused(): boolean
```

**返回值**: 窗口是否聚焦

**示例**:

```typescript
if (isWindowFocused()) {
  console.log("窗口已聚焦");
} else {
  console.log("窗口未聚焦");
}
```

### getWindowSize

获取窗口尺寸。

```typescript
function getWindowSize(): { width: number; height: number }
```

**返回值**: 包含 `width` 和 `height` 的对象

**示例**:

```typescript
const { width, height } = getWindowSize();
console.log(`窗口尺寸: ${width}x${height}`);
```

### getScreenSize

获取屏幕尺寸。

```typescript
function getScreenSize(): { width: number; height: number }
```

**返回值**: 包含 `width` 和 `height` 的对象

**示例**:

```typescript
const { width, height } = getScreenSize();
console.log(`屏幕尺寸: ${width}x${height}`);
```

### scrollToTop

滚动到页面顶部（平滑滚动）。

```typescript
function scrollToTop(): void
```

**示例**:

```typescript
// 滚动到顶部
scrollToTop();
```

### scrollToBottom

滚动到页面底部（平滑滚动）。

```typescript
function scrollToBottom(): void
```

**示例**:

```typescript
// 滚动到底部
scrollToBottom();
```

### reload

刷新页面。

```typescript
function reload(): void
```

**示例**:

```typescript
// 刷新页面
reload();
```

### replaceLocation

替换当前页面 URL（不保留历史记录）。

```typescript
function replaceLocation(url: string): void
```

**参数**:
- `url`: 目标 URL

**示例**:

```typescript
// 跳转到新页面（不保留当前页面在历史记录中）
replaceLocation("/dashboard");
```

## 类型定义

```typescript
interface OpenWindowOptions {
  noopener?: boolean;
  noreferrer?: boolean;
  target?: "_blank" | "_parent" | "_self" | "_top" | string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}
```

## 实际应用示例

### 外部链接处理

```typescript
import { openWindow } from "@zid-utils/window-utils";

function openExternalLink(url: string) {
  openWindow(url, {
    noopener: true,
    noreferrer: true,
  });
}

// 使用
const link = document.querySelector(".external-link");
link.addEventListener("click", (e) => {
  e.preventDefault();
  openExternalLink(link.href);
});
```

### 返回顶部按钮

```typescript
import { scrollToTop } from "@zid-utils/window-utils";

const backToTopBtn = document.createElement("button");
backToTopBtn.textContent = "返回顶部";
backToTopBtn.className = "back-to-top";
backToTopBtn.style.display = "none";

backToTopBtn.addEventListener("click", scrollToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

document.body.appendChild(backToTopBtn);
```

### 无限滚动加载

```typescript
import { scrollToBottom } from "@zid-utils/window-utils";

let isLoading = false;

async function loadMoreContent() {
  if (isLoading) return;

  isLoading = true;
  await fetchNextPage();
  isLoading = false;
}

window.addEventListener("scroll", () => {
  const { height } = getWindowSize();
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + height >= documentHeight - 500) {
    loadMoreContent();
  }
});
```

### 响应式布局适配

```typescript
import { getScreenSize, getWindowSize } from "@zid-utils/window-utils";

function adjustLayout() {
  const screen = getScreenSize();
  const window = getWindowSize();

  const isLargeScreen = screen.width >= 1920;
  const isMediumScreen = screen.width >= 1280 && screen.width < 1920;

  document.body.classList.remove("large-screen", "medium-screen", "small-screen");

  if (isLargeScreen) {
    document.body.classList.add("large-screen");
  } else if (isMediumScreen) {
    document.body.classList.add("medium-screen");
  } else {
    document.body.classList.add("small-screen");
  }
}

window.addEventListener("resize", adjustLayout);
adjustLayout();
```

### 页面导航工具

```typescript
import {
  replaceLocation,
  reload,
  isWindowFocused,
} from "@zid-utils/window-utils";

function navigateTo(url: string, replace = true) {
  if (replace) {
    replaceLocation(url);
  } else {
    window.location.href = url;
  }
}

async function refreshIfFocused() {
  if (isWindowFocused()) {
    reload();
  }
}

// 设置定时刷新
setInterval(refreshIfFocused, 30000);
```

## 浏览器兼容性

所有函数都基于标准的 Window API，兼容所有现代浏览器。

## 安全提示

1. `closeWindow()` 只能关闭由脚本打开的窗口
2. 使用 `openWindow()` 时建议设置 `noopener: true` 和 `noreferrer: true` 以提高安全性
3. 弹出窗口可能被浏览器拦截，建议在用户交互事件中调用

## License

MIT
