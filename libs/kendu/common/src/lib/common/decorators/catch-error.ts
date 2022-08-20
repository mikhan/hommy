import { assertIsFunction } from '../utilities/assertions'
import { catchError, CatchErrorConfig } from '../utilities/catch-error'

export function CatchError(config: CatchErrorConfig) {
  return function (_target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    assertIsFunction(descriptor.value, `Property ${String(propertyKey)} must be a method.`)

    descriptor.value = catchError(descriptor.value, config)

    return descriptor
  }
}
