import { setDescriptor } from './decorate'

export function Show() {
  return function (target: Object, propertyKey: string | symbol) {
    setDescriptor(target.constructor, propertyKey, { enumerable: true })
  }
}
