import { AsyncCallback } from '../interfaces/callback'

const defaultResolver: (...args: any[]) => string = JSON.stringify

export function delegate<D = any, A extends any[] = any[]>(
  fnc: AsyncCallback<D, A>,
  resolver: (...args: A) => string = defaultResolver,
): AsyncCallback<D, A> {
  const delegatedKeysMap = new Map<string, Promise<any>>()

  return function (this: any, ...args: A): Promise<D> {
    const key = resolver(...args)
    let promise = delegatedKeysMap.get(key)

    if (!promise) {
      promise = fnc.apply(this, args).finally(() => delegatedKeysMap.delete(key))
      delegatedKeysMap.set(key, promise)
    }

    return promise
  }
}
