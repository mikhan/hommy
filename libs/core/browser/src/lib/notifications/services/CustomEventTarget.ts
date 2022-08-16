type CustomEventMap<T> = {
  [K: string]: T
}

interface CustomEventListener<T> {
  (event: CustomEvent<T>): void
}

interface CustomEventInit<T> {
  detail: T
}

interface CustomEventListenerObject<T> {
  handleEvent(event: CustomEvent<T>): void
}

type CustomCallback<T> = CustomEventListener<T> | CustomEventListenerObject<T>

export interface CustomEventTarget<T extends CustomEventMap<unknown>> extends EventTarget {
  addEventListener<K extends keyof T>(
    type: K,
    callback: CustomCallback<T[K]> | null,
    options?: AddEventListenerOptions | boolean,
  ): void
  dispatchEvent(event: CustomEvent<T[keyof T]>): boolean
  removeEventListener<K extends keyof T>(
    type: K,
    callback: CustomCallback<T[K]> | null,
    options?: EventListenerOptions | boolean,
  ): void
}

export function createEvent<Types extends CustomEventMap<any>>(): {
  new <Type extends keyof Types, Detail extends Types[Type]>(
    type: Type,
    ...customEventInit: Detail extends undefined ? [undefined?] : [CustomEventInit<Detail>]
  ): CustomEvent<Detail>
} {
  return CustomEvent as any
}

export function createEventTarget<Types extends CustomEventMap<any>>() {
  return EventTarget as unknown as { new (): CustomEventTarget<Types> }
}

// interface StateEventMap {
//   date?: Date
//   number: number
// }

// const TestEvent = createEvent<StateEventMap>()
// const TestEventTarget = createEventTarget<StateEventMap>()

// new TestEvent('date')
// new TestEvent('number', { detail: 54 })

// export const dateTestEvent1 = new TestEvent('date')
// export const dateTestEvent2 = new TestEvent('date', { detail: new Date() })
// export const numberTestEvent3 = new TestEvent('number', { detail: 5 })

// export const dateTestEvent3 = new TestEvent('date', { detail: 5 })
// export const numberTestEvent1 = new TestEvent('number', { detail: '5' })
// export const numberTestEvent2 = new TestEvent('number')
