import { isFunction } from '../../validation/utilities/predicate'
import { PropertyDecorator } from '../interfaces/property-decorator'
import { setDescriptor, getDescriptor } from './define'

export function Memoize(): PropertyDecorator {
  return function (target, propertyKey, descriptor) {
    if (!descriptor) {
      return
    } else if (isFunction(descriptor?.value)) {
      functionMemoize(target, propertyKey, descriptor?.value)
    } else if (isFunction(descriptor?.get)) {
      setterMemoize(target, propertyKey, descriptor?.get)
    }
  }
}

function functionMemoize(target: object, propertyKey: string | symbol, fnc: Function) {
  const cache = new Map<unknown, unknown>()
  setDescriptor(target.constructor, propertyKey, {
    value(args: any[]) {
      const [arg] = args

      if (!cache.has(arg)) {
        cache.set(arg, fnc.apply(this, args))
      }

      return cache.get(arg)
    },
  })
}

function setterMemoize(target: object, propertyKey: string | symbol, fnc: Function) {
  setDescriptor(target.constructor, propertyKey, {
    configurable: true,
    get(this: typeof target) {
      const { enumerable, configurable } = getDescriptor(target.constructor, propertyKey)

      Reflect.defineProperty(this, propertyKey, {
        value: fnc.apply(this),
        writable: false,
        enumerable: enumerable ?? true,
        configurable: configurable ?? true,
      })

      return Reflect.get(target, propertyKey)
    },
  })
}
