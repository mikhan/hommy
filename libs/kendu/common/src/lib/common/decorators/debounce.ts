import { debounce } from '../utilities/async'

export function Debounce(delay: number) {
  return function (_target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (descriptor.set) {
      descriptor.set = debounce(descriptor.set, delay)
    } else if (descriptor.get) {
      descriptor.get = debounce(descriptor.get, delay)
    } else if (descriptor.value) {
      descriptor.value = debounce(descriptor.value, delay)
    }
  }
}
