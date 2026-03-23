export interface OpenWindowOptions {
  noopener?: boolean;
  noreferrer?: boolean;
  target?: "_blank" | "_parent" | "_self" | "_top" | string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

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

export function closeWindow(): void {
  window.close();
}

export function focusWindow(): void {
  window.focus();
}

export function isWindowFocused(): boolean {
  return window.focused !== false;
}

export function getWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function getScreenSize(): { width: number; height: number } {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToBottom(): void {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export function reload(): void {
  window.location.reload();
}

export function replaceLocation(url: string): void {
  window.location.replace(url);
}
