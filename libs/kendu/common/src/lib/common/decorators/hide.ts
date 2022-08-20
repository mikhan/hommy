import { setDescriptor } from './decorate'

export function Hide() {
  return function (target: Object, propertyKey: string | symbol) {
    setDescriptor(target.constructor, propertyKey, { enumerable: false })
  }
}
