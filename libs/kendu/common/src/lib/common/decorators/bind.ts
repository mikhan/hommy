import { assertIsFunction } from '../utilities/assertions'

export function Bind() {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const { value } = descriptor

    assertIsFunction(value, `Property ${String(propertyKey)} must be a method.`)

    return {
      configurable: true,
      get() {
        const bound = value.bind(this)

        if (target.constructor.name === this.constructor.name) {
          Object.defineProperty(this, propertyKey, { value: bound, writable: true, configurable: true })
        }

        return bound
      },
    }
  }
}
