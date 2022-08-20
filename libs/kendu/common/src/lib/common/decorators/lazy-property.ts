export function LazyProperty(getter: (target: any) => unknown) {
  return function (target: Object, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      set() {
        Object.defineProperty(this, propertyKey, {
          enumerable: true,
          configurable: true,
          get() {
            const value = getter(this)
            Object.defineProperty(this, propertyKey, { value, writable: false, enumerable: true, configurable: true })

            return value
          },
        })
      },
    })
  }
}

LazyProperty.setValue = function <T>(): T {
  return null as unknown as T
}
