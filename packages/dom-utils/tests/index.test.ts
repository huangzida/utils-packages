import { describe, it, expect } from 'vitest'
import { getLcShapeElement } from '../src/index'

describe('@zid-utils/dom-utils', () => {
  it('should be defined as a function', () => {
    expect(typeof getLcShapeElement).toBe('function')
  })
})
