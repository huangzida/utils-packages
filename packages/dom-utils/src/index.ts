export const getLcShapeElement = (shape_id: string): Element | null => {
  return document.querySelector(`.lc-shape[shape-id="${shape_id}"]`)
}

export interface ElementRect {
  top: number
  left: number
  width: number
  height: number
}

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

export function getScrollbarWidth(): number {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText =
    'width:99px;height:99px;overflow:scroll;position:absolute;top:-9999px'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

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

export function triggerWindowResize(): void {
  window.dispatchEvent(new Event('resize'))
}
