# @zid-utils/dom-utils

> DOM 元素可见区域、滚动条检测工具库 (DOM element visibility and scrollbar detection utilities)

## 安装

```bash
pnpm add @zid-utils/dom-utils
```

## 概述

提供 DOM 元素相关的工具函数，包括元素可见区域获取、滚动条检测、窗口 resize 触发等功能。

## 使用方法

```typescript
import {
  getElementVisibleRect,
  getScrollbarWidth,
  needsScrollbar,
  triggerWindowResize,
} from "@zid-utils/dom-utils";

// 获取元素可见区域
const rect = await getElementVisibleRect(element);
console.log(rect);
// { top: 100, left: 50, width: 300, height: 200 }

// 获取滚动条宽度
const width = getScrollbarWidth();
console.log(width); // 17

// 检查元素是否需要滚动条
const hasScrollbar = needsScrollbar(container);
console.log(hasScrollbar); // true

// 触发窗口 resize 事件
triggerWindowResize();
```

## 函数详解

### getElementVisibleRect

获取元素在视口中的可见区域。

```typescript
function getElementVisibleRect(element: HTMLElement): Promise<ElementRect | null>
```

**参数**:
- `element`: HTML 元素

**返回值**: 包含 `top`, `left`, `width`, `height` 的对象，如果元素不可见则返回 `null`

**示例**:

```typescript
const element = document.getElementById("my-div");

const rect = await getElementVisibleRect(element);

if (rect) {
  console.log(`元素可见区域: ${rect.width}x${rect.height}`);
  console.log(`位置: (${rect.left}, ${rect.top})`);
}
```

### getScrollbarWidth

获取浏览器滚动条的宽度。

```typescript
function getScrollbarWidth(): number
```

**返回值**: 滚动条宽度（像素）

**示例**:

```typescript
const width = getScrollbarWidth();
console.log(`滚动条宽度: ${width}px`);

// 应用动态样式
document.documentElement.style.setProperty(
  "--scrollbar-width",
  `${width}px`
);
```

### needsScrollbar

检查元素是否需要滚动条。

```typescript
function needsScrollbar(
  element: HTMLElement | null,
  direction?: "horizontal" | "vertical"
): boolean
```

**参数**:
- `element`: HTML 元素，传入 `null` 则检查整个文档
- `direction`: 检查方向，可选 `"horizontal"` 或 `"vertical"`，不传则检查两个方向

**返回值**: 是否需要滚动条

**示例**:

```typescript
const container = document.getElementById("scroll-container");

// 检查垂直滚动条
if (needsScrollbar(container, "vertical")) {
  console.log("容器需要垂直滚动条");
}

// 检查水平滚动条
if (needsScrollbar(container, "horizontal")) {
  console.log("容器需要水平滚动条");
}

// 检查任一方向
if (needsScrollbar(container)) {
  console.log("容器需要滚动条");
}

// 检查整个文档
if (needsScrollbar(null)) {
  console.log("页面需要滚动条");
}
```

### triggerWindowResize

手动触发窗口的 resize 事件。

```typescript
function triggerWindowResize(): void
```

**示例**:

```typescript
// 在动态修改元素尺寸后触发 resize 事件
triggerWindowResize();
```

## 类型定义

```typescript
interface ElementRect {
  top: number;    // 顶部距离视口顶部的像素数
  left: number;   // 左侧距离视口左边的像素数
  width: number;  // 可见区域宽度
  height: number; // 可见区域高度
}
```

## 实际应用示例

### 懒加载图片

```typescript
import { getElementVisibleRect } from "@zid-utils/dom-utils";

async function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  for (const img of images) {
    const rect = await getElementVisibleRect(img as HTMLElement);

    if (rect && rect.height > 0) {
      const src = img.getAttribute("data-src");
      if (src) {
        img.setAttribute("src", src);
        img.removeAttribute("data-src");
      }
    }
  }
}

// 初始加载
lazyLoadImages();

// 滚动时加载
window.addEventListener("scroll", lazyLoadImages, { passive: true });
```

### 动态样式主题

```typescript
import { getScrollbarWidth } from "@zid-utils/dom-utils";

function applyScrollbarStyles() {
  const width = getScrollbarWidth();

  const style = document.createElement("style");
  style.textContent = `
    ::-webkit-scrollbar {
      width: ${width}px;
      height: ${width}px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: ${width / 2}px;
    }
  `;

  document.head.appendChild(style);
}

applyScrollbarStyles();
```

### 滚动容器样式

```typescript
import { needsScrollbar } from "@zid-utils/dom-utils";

function updateContainerClass() {
  const container = document.getElementById("main-container");

  if (needsScrollbar(container, "vertical")) {
    container.classList.add("has-vertical-scrollbar");
  } else {
    container.classList.remove("has-vertical-scrollbar");
  }
}

// 监听内容变化
const observer = new MutationObserver(updateContainerClass);
observer.observe(document.body, { childList: true, subtree: true });

// 初始检查
updateContainerClass();
```

### 固定定位元素偏移

```typescript
import { getScrollbarWidth } from "@zid-utils/dom-utils";

function adjustFixedElements() {
  const scrollbarWidth = getScrollbarWidth();
  const hasScrollbar = needsScrollbar(null);

  if (hasScrollbar) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.querySelectorAll(".fixed-header, .fixed-sidebar").forEach((el) => {
      (el as HTMLElement).style.right = `${scrollbarWidth}px`;
    });
  }
}

// 监听窗口大小变化
window.addEventListener("resize", adjustFixedElements);
adjustFixedElements();
```

## 浏览器兼容性

所有函数都基于标准的 DOM API，兼容所有现代浏览器。

## License

MIT
