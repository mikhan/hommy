import { Subscription } from 'rxjs'
import { Constructor } from '../interfaces/constructor'
import { assertIsFunction } from '../utilities/assertions'
import { isString, isUnsubscribable } from '../utilities/predicate'

interface AutoUnsubscribeSettings {
  event?: string
}

export function AutoUnsubscribe(options: AutoUnsubscribeSettings | string = {}) {
  return function <T extends Object>(constructor: Constructor<T>) {
    assertIsFunction(constructor, `AutoUnsubscribe decorator must be applied to class.`)

    const methodName = isString(options) ? options : options.event ?? 'ngOnDestroy'
    const original: undefined | ((...args: unknown[]) => void) = constructor.prototype[methodName]

    constructor.prototype[methodName] = function (...args: unknown[]) {
      const observables: Subscription[] = []

      for (const property of Object.values(this)) {
        if (isUnsubscribable<Subscription>(property) && !observables.includes(property)) {
          observables.push(property)
        }
      }

      for (const observable of observables) {
        observable.unsubscribe()
      }

      original?.apply(this, args)
    }
  }
}
