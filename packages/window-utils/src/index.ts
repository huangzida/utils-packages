/**
 * 打开窗口选项
 */
export interface OpenWindowOptions {
  /** 是否禁用 opener（默认 true）*/
  noopener?: boolean;
  /** 是否禁用 referrer（默认 true）*/
  noreferrer?: boolean;
  /** 打开目标（默认 _blank）*/
  target?: "_blank" | "_parent" | "_self" | "_top" | string;
  /** 窗口宽度（默认 600）*/
  width?: number;
  /** 窗口高度（默认 400）*/
  height?: number;
  /** 窗口左边距 */
  left?: number;
  /** 窗口上边距 */
  top?: number;
}

/**
 * 打开新窗口
 * @param url - 目标 URL
 * @param options - 窗口选项
 * @returns 窗口对象
 */
export function openWindow(
  url: string,
  options: OpenWindowOptions = {},
): Window | null {
  const {
    noopener = true,
    noreferrer = true,
    target = "_blank",
    width = 600,
    height = 400,
    left = (window.screen.width - width) / 2,
    top = (window.screen.height - height) / 2,
  } = options;

  const features = [
    noopener && "noopener=yes",
    noreferrer && "noreferrer=yes",
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
  ]
    .filter(Boolean)
    .join(",");

  return window.open(url, target, features);
}

/** 关闭窗口 */
export function closeWindow(): void {
  window.close();
}

/** 聚焦窗口 */
export function focusWindow(): void {
  window.focus();
}

/** 检查窗口是否聚焦 */
export function isWindowFocused(): boolean {
  return typeof document !== 'undefined' ? document.hasFocus() : true;
}

/** 获取窗口尺寸 */
export function getWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/** 获取屏幕尺寸 */
export function getScreenSize(): { width: number; height: number } {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
}

/** 滚动到顶部 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** 滚动到底部 */
export function scrollToBottom(): void {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

/** 刷新页面 */
export function reload(): void {
  window.location.reload();
}

/**
 * 替换当前页面 URL
 * @param url - 目标 URL
 */
export function replaceLocation(url: string): void {
  window.location.replace(url);
}
