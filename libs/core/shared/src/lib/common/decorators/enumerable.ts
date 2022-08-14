import { PropertyDecorator } from '../interfaces/property-decorator'
import { setDescriptor } from './define'

export function Enumerable(enumerable = true): PropertyDecorator {
  return function (target, propertyKey) {
    setDescriptor(target.constructor, propertyKey, { enumerable })
  }
}
