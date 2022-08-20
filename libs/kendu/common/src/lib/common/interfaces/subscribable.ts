import { Observer } from './observer'
import { Unsubscribable } from './unsubscribable'

export interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable
}
