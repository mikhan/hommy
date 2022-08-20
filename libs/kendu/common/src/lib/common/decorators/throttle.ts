import { throttle } from '../utilities/async'

export function Throttle(delay: number) {
  return function (_target: unknown, _propertyKey: unknown, descriptor: PropertyDescriptor) {
    if (descriptor.set) {
      descriptor.set = throttle(descriptor.set, delay)
    } else if (descriptor.get) {
      descriptor.get = throttle(descriptor.get, delay)
    } else if (descriptor.value) {
      descriptor.value = throttle(descriptor.value, delay)
    }
  }
}
