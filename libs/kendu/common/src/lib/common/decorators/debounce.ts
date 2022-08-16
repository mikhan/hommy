import { isFunction } from '../../validation/utilities/predicate'
import { AnyVoidCallback } from '../interfaces/function'
import { debounce } from '../utilities/async'

export function Debounce(delay: number) {
  return function (_target: unknown, _propertyKey: unknown, descriptor: TypedPropertyDescriptor<AnyVoidCallback>) {
    if (!descriptor.value || !isFunction(descriptor.value)) return

    descriptor.value = debounce(descriptor.value, delay)
  }
}
