import { Subject, Subscription, Observer } from 'rxjs'

export class NotificationQueue<T> extends Subject<T> {
  private queuedValues: T[] = []

  override next(value: T): void {
    if (this.closed || this.observed) super.next(value)
    else this.queuedValues.push(value)
  }

  override subscribe(observer?: Partial<Observer<T>>): Subscription
  override subscribe(next: (value: T) => void): Subscription
  override subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription {
    const subscription =
      typeof observerOrNext === 'function' ? super.subscribe(observerOrNext) : super.subscribe(observerOrNext)

    for (const value of this.queuedValues) {
      super.next(value)
    }

    this.queuedValues.length = 0

    return subscription
  }
}
