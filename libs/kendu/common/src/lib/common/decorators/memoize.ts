import { assertIsFunction } from '../utilities/assertions'
import { memoize, MemoizeConfig } from '../utilities/memoize'

export function Memoize(config: MemoizeConfig = {}) {
  return function (_target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const fnc = descriptor.value as unknown

    assertIsFunction<() => any>(fnc, `Property ${String(propertyKey)} must be a method.`)

    descriptor.value = memoize(fnc, config)
  }
}
