import { setDescriptor } from './decorate'

export function Enumerable(enumerable = true) {
  return function (target: Object, propertyKey: string | symbol) {
    setDescriptor(target.constructor, propertyKey, { enumerable })
  }
}
