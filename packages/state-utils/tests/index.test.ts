import { describe, it, expect } from 'vitest'
import { StateHandler, createStateHandler } from '../src/index'

describe('@zid-utils/state-utils', () => {
  describe('StateHandler', () => {
    it('should initialize with initial value', () => {
      const handler = new StateHandler(0)
      expect(handler.getValue()).toBe(0)
    })

    it('should set value', () => {
      const handler = new StateHandler(0)
      handler.setValue(10)
      expect(handler.getValue()).toBe(10)
    })

    it('should notify subscribers on value change', () => {
      const handler = new StateHandler(0)
      let receivedValue = -1

      handler.subscribe((value) => {
        receivedValue = value
      })

      handler.setValue(20)
      expect(receivedValue).toBe(20)
    })

    it('should not notify when condition fails', () => {
      const handler = new StateHandler(0, (v) => v > 0)
      let notified = false

      handler.subscribe(() => {
        notified = true
      })

      handler.setValue(-5)
      expect(notified).toBe(false)
      expect(handler.getValue()).toBe(0)
    })

    it('should allow setting when condition passes', () => {
      const handler = new StateHandler(0, (v) => v > 0)
      handler.setValue(5)
      expect(handler.getValue()).toBe(5)
    })

    it('should update value using updater function', () => {
      const handler = new StateHandler(10)
      handler.update((v) => v * 2)
      expect(handler.getValue()).toBe(20)
    })

    it('should unsubscribe from changes', () => {
      const handler = new StateHandler(0)
      let callCount = 0

      const unsubscribe = handler.subscribe(() => {
        callCount++
      })

      handler.setValue(1)
      expect(callCount).toBe(1)

      unsubscribe()
      handler.setValue(2)
      expect(callCount).toBe(1)
    })
  })

  describe('createStateHandler', () => {
    it('should create state handler with initial value', () => {
      const handler = createStateHandler('initial')
      expect(handler.getValue()).toBe('initial')
    })

    it('should create state handler with condition', () => {
      const handler = createStateHandler(0, (v) => v >= 0)
      handler.setValue(5)
      expect(handler.getValue()).toBe(5)
      handler.setValue(-1)
      expect(handler.getValue()).toBe(5)
    })
  })
})
