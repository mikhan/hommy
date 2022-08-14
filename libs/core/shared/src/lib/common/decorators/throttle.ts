import { isFunction } from '../../validation/utilities/predicate'
import { AnyCallback } from '../interfaces/function'
import { throttle } from '../utilities/async'

export function Throttle(delay: number) {
  return function (_target: unknown, _propertyKey: unknown, descriptor: TypedPropertyDescriptor<AnyCallback>) {
    if (!descriptor.value || !isFunction(descriptor.value)) return

    descriptor.value = throttle(descriptor.value, delay)
  }
}
