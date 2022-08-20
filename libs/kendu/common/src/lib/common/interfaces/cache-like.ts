export interface CacheLike<K, V> {
  get(key: K): V | undefined
  set(key: K, value: V): unknown
  has(key: K): boolean
}
