import { AsyncCallback } from '../interfaces/callback'

export interface CatchErrorConfig {
  handler: ((...args: any[]) => any) | keyof any
}

export type ErrorHandler = (e?: unknown, args?: any[]) => any

export function catchError<D = any, A extends any[] = any[]>(
  originalMethod: AsyncCallback<D, A>,
  config: CatchErrorConfig,
): AsyncCallback<D, A> {
  return async function (this: any, ...args: A): Promise<D> {
    const onErrorFunc: ErrorHandler =
      typeof config.handler === 'string' ? this[config.handler].bind(this) : config.handler

    try {
      const res = await originalMethod.apply(this, args)
      return res
    } catch (e) {
      return onErrorFunc(e, args)
    }
  }
}
