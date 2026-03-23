/**
 * 元素矩形区域接口
 */
export interface ElementRect {
  /** 顶部距离 */
  top: number
  /** 左侧距离 */
  left: number
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
}

/**
 * 获取元素可见区域
 * @param element - HTML 元素
 * @returns 元素矩形区域或 null
 */
export function getElementVisibleRect(
  element: HTMLElement,
): Promise<ElementRect | null> {
  return new Promise((resolve) => {
    if (!element) {
      resolve(null)
      return
    }

    const rect = element.getBoundingClientRect()
    const visibility = rect.width > 0 && rect.height > 0

    if (!visibility) {
      resolve(null)
      return
    }

    resolve({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  })
}

/**
 * 获取滚动条宽度
 * @returns 滚动条宽度（像素）
 */
export function getScrollbarWidth(): number {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText =
    'width:99px;height:99px;overflow:scroll;position:absolute;top:-9999px'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

/**
 * 检查元素是否需要滚动条
 * @param element - HTML 元素
 * @param direction - 检测方向（默认垂直）
 * @returns 是否需要滚动条
 */
export function needsScrollbar(
  element: HTMLElement | null,
  direction: 'horizontal' | 'vertical' = 'vertical',
): boolean {
  if (!element) return false

  if (direction === 'vertical') {
    return element.scrollHeight > element.clientHeight
  }

  return element.scrollWidth > element.clientWidth
}

/**
 * 触发窗口 resize 事件
 */
export function triggerWindowResize(): void {
  window.dispatchEvent(new Event('resize'))
}
