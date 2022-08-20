import { assertIsFunction } from '../utilities/assertions'
import { delegate } from '../utilities/delegate'

export function Delegate(resolver?: (...args: any[]) => string) {
  return function (_target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    assertIsFunction(descriptor.value, `Property ${String(propertyKey)} must be a method.`)

    descriptor.value = delegate(descriptor.value, resolver)

    return descriptor
  }
}
