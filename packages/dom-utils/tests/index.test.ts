import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getLcShapeElement,
  getElementVisibleRect,
  getScrollbarWidth,
  needsScrollbar,
  triggerWindowResize,
} from '../src/index'

describe('@zid-utils/dom-utils', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('getLcShapeElement', () => {
    it('should return null when no element matches', () => {
      container.innerHTML = '<div class="other">test</div>'
      expect(getLcShapeElement('non-existent')).toBeNull()
    })

    it('should return element when shape-id matches', () => {
      container.innerHTML = '<div class="lc-shape" shape-id="test-123">element</div>'
      const el = getLcShapeElement('test-123')
      expect(el).not.toBeNull()
      expect(el?.getAttribute('shape-id')).toBe('test-123')
    })

    it('should return null for empty shape-id', () => {
      container.innerHTML = '<div class="lc-shape">no id</div>'
      expect(getLcShapeElement('')).toBeNull()
    })

    it('should return null when no lc-shape elements exist', () => {
      container.innerHTML = '<div class="not-lc-shape">other</div>'
      expect(getLcShapeElement('any-id')).toBeNull()
    })

    it('should find element among multiple lc-shape elements', () => {
      container.innerHTML = `
        <div class="lc-shape" shape-id="first">First</div>
        <div class="lc-shape" shape-id="second">Second</div>
        <div class="lc-shape" shape-id="third">Third</div>
      `
      const el = getLcShapeElement('second')
      expect(el).not.toBeNull()
      expect(el?.textContent).toBe('Second')
    })

    it('should handle special characters in shape-id', () => {
      container.innerHTML = '<div class="lc-shape" shape-id="test-id_123">special</div>'
      const el = getLcShapeElement('test-id_123')
      expect(el).not.toBeNull()
      expect(el?.getAttribute('shape-id')).toBe('test-id_123')
    })
  })

  describe('getElementVisibleRect', () => {
    it('should return null for null element', async () => {
      const result = await getElementVisibleRect(null as any)
      expect(result).toBeNull()
    })

    it('should return rect for element with dimensions', async () => {
      Object.defineProperty(container, 'getBoundingClientRect', {
        value: () => ({ top: 0, left: 0, width: 100, height: 50 }),
        writable: true,
      })
      const result = await getElementVisibleRect(container)
      expect(result).not.toBeNull()
    })
  })

  describe('getScrollbarWidth', () => {
    it('should return a number', () => {
      const width = getScrollbarWidth()
      expect(typeof width).toBe('number')
      expect(width).toBeGreaterThanOrEqual(0)
    })
  })

  describe('needsScrollbar', () => {
    it('should return false for null element', () => {
      expect(needsScrollbar(null)).toBe(false)
    })

    it('should check scrollHeight vs clientHeight', () => {
      Object.defineProperty(container, 'scrollHeight', { value: 200 })
      Object.defineProperty(container, 'clientHeight', { value: 50 })
      expect(needsScrollbar(container, 'vertical')).toBe(true)
    })

    it('should check scrollWidth vs clientWidth', () => {
      Object.defineProperty(container, 'scrollWidth', { value: 500 })
      Object.defineProperty(container, 'clientWidth', { value: 100 })
      expect(needsScrollbar(container, 'horizontal')).toBe(true)
    })
  })

  describe('triggerWindowResize', () => {
    it('should dispatch resize event', () => {
      let resizeCount = 0
      window.addEventListener('resize', () => {
        resizeCount++
      })
      triggerWindowResize()
      expect(resizeCount).toBe(1)
    })
  })
})
