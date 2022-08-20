import { assertIsFunction } from '../utilities/assertions'

export function StopPropagation() {
  return function (_target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const fnc = descriptor.value as unknown

    assertIsFunction(fnc, `Property ${String(propertyKey)} must be a method.`)

    descriptor.value = function (...args: any[]) {
      const event = args.find((arg): arg is Event => arg instanceof Event)

      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      return fnc.apply(this, args)
    }
  }
}
