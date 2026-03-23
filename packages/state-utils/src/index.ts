type StateHandlerCallback<T> = (value: T) => void

export class StateHandler<T> {
  private value: T

  private callbacks: Set<StateHandlerCallback<T>> = new Set()

  private condition: (value: T) => boolean

  constructor(initialValue: T, condition: (value: T) => boolean = () => true) {
    this.value = initialValue
    this.condition = condition
  }

  getValue(): T {
    return this.value
  }

  setValue(value: T): void {
    if (this.condition(value)) {
      this.value = value
      this.notify()
    }
  }

  reset(): void {
    this.value = this.value as T
    this.notify()
  }

  subscribe(callback: StateHandlerCallback<T>): () => void {
    this.callbacks.add(callback)
    return () => {
      this.callbacks.delete(callback)
    }
  }

  update(updater: (value: T) => T): void {
    const newValue = updater(this.value)
    this.setValue(newValue)
  }

  private notify(): void {
    this.callbacks.forEach((callback) => callback(this.value))
  }
}

export function createStateHandler<T>(
  initialValue: T,
  condition?: (value: T) => boolean,
): StateHandler<T> {
  return new StateHandler(initialValue, condition)
}
