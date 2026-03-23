type StateHandlerCallback<T> = (value: T) => void

/**
 * 状态处理器类
 * 支持条件验证、订阅更新、批量更新
 */
export class StateHandler<T> {
  private value: T

  private callbacks: Set<StateHandlerCallback<T>> = new Set()

  private condition: (value: T) => boolean

  /**
   * @param initialValue - 初始值
   * @param condition - 值验证条件
   */
  constructor(initialValue: T, condition: (value: T) => boolean = () => true) {
    this.value = initialValue
    this.condition = condition
  }

  /** 获取当前值 */
  getValue(): T {
    return this.value
  }

  /** 设置值（需通过条件验证） */
  setValue(value: T): void {
    if (this.condition(value)) {
      this.value = value
      this.notify()
    }
  }

  /** 重置状态并通知订阅者 */
  reset(): void {
    this.value = this.value as T
    this.notify()
  }

  /** 订阅状态变化 */
  subscribe(callback: StateHandlerCallback<T>): () => void {
    this.callbacks.add(callback)
    return () => {
      this.callbacks.delete(callback)
    }
  }

  /** 通过更新函数更新值 */
  update(updater: (value: T) => T): void {
    const newValue = updater(this.value)
    this.setValue(newValue)
  }

  private notify(): void {
    this.callbacks.forEach((callback) => callback(this.value))
  }
}

/**
 * 创建状态处理器实例
 * @param initialValue - 初始值
 * @param condition - 值验证条件
 * @returns StateHandler 实例
 */
export function createStateHandler<T>(
  initialValue: T,
  condition?: (value: T) => boolean,
): StateHandler<T> {
  return new StateHandler(initialValue, condition)
}
