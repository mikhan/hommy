import { Subscription } from 'rxjs'
import { isSubscription } from '../../validation/utilities/predicate'
import { Type } from '../interfaces/type'

interface AutoUnsubscribeSettings {
  event?: string
}

export function AutoUnsubscribe(options: AutoUnsubscribeSettings = {}) {
  return function <T extends object>(constructor: Type<T>) {
    const methodName = options.event ?? 'ngOnDestroy'
    const original: undefined | ((...args: unknown[]) => void) = constructor.prototype[methodName]

    constructor.prototype[methodName] = function (...args: unknown[]) {
      const observables: Subscription[] = []

      for (const property of Object.values(this)) {
        if (isSubscription(property) && !observables.includes(property)) {
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
