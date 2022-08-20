import { CacheLike } from '../interfaces/cache-like'
import { isUndefined } from './predicate'

export interface MemoizeConfig<K = unknown, V = unknown> {
  resolver?: (...args: any[]) => any
  cache?: CacheLike<K, V>
}

export type Memoized<T extends (...args: any[]) => any> = T & { cache: CacheLike<Parameters<T>[0], ReturnType<T>> }

export function memoize<T extends (...args: any[]) => any>(func: T, config: MemoizeConfig = {}): Memoized<T> {
  const resolver = config.resolver ?? ((arg: unknown) => arg)
  const cache = config.cache ?? new Map()

  function memoized(this: T, ...args: any[]) {
    const key = resolver.apply(this, args)
    const cache = memoized.cache

    if (cache.has(key)) return cache.get(key)

    const result = func.apply(this, args)

    if (!isUndefined(result)) cache.set(key, result)

    return result
  }

  memoized.cache = cache

  return memoized as Memoized<T>
}
