import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getLcShapeElement } from '../src/index'

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
})
