import { describe, it, expect } from 'vitest'
import {
  closeWindow,
  focusWindow,
  isWindowFocused,
  getWindowSize,
  getScreenSize,
  scrollToTop,
  scrollToBottom,
  reload,
  replaceLocation,
} from '../src/index'

describe('@zid-utils/window-utils', () => {
  describe('closeWindow', () => {
    it('should be a function', () => {
      expect(typeof closeWindow).toBe('function')
    })
  })

  describe('focusWindow', () => {
    it('should be a function', () => {
      expect(typeof focusWindow).toBe('function')
    })
  })

  describe('isWindowFocused', () => {
    it('should be a function', () => {
      expect(typeof isWindowFocused).toBe('function')
    })

    it('should return boolean', () => {
      expect(typeof isWindowFocused()).toBe('boolean')
    })
  })

  describe('getWindowSize', () => {
    it('should be a function', () => {
      expect(typeof getWindowSize).toBe('function')
    })

    it('should return object with width and height', () => {
      const size = getWindowSize()
      expect(size).toHaveProperty('width')
      expect(size).toHaveProperty('height')
      expect(typeof size.width).toBe('number')
      expect(typeof size.height).toBe('number')
    })
  })

  describe('getScreenSize', () => {
    it('should be a function', () => {
      expect(typeof getScreenSize).toBe('function')
    })

    it('should return object with width and height', () => {
      const size = getScreenSize()
      expect(size).toHaveProperty('width')
      expect(size).toHaveProperty('height')
      expect(typeof size.width).toBe('number')
      expect(typeof size.height).toBe('number')
    })
  })

  describe('scrollToTop', () => {
    it('should be a function', () => {
      expect(typeof scrollToTop).toBe('function')
    })
  })

  describe('scrollToBottom', () => {
    it('should be a function', () => {
      expect(typeof scrollToBottom).toBe('function')
    })
  })

  describe('reload', () => {
    it('should be a function', () => {
      expect(typeof reload).toBe('function')
    })
  })

  describe('replaceLocation', () => {
    it('should be a function', () => {
      expect(typeof replaceLocation).toBe('function')
    })
  })
})
