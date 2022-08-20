import { get, set, del, clear, createStore, UseStore, entries, keys, values } from 'idb-keyval'
import { KeyvalStorage } from '../interfaces/keyval-storage'

export abstract class IdbStorageService<K extends IDBValidKey, V> implements KeyvalStorage<K, V> {
  protected abstract readonly database: string

  protected abstract readonly store: string

  private _storage?: UseStore
  get storage() {
    this._storage ??= createStore(this.database, this.store)

    return this._storage
  }

  get(key: K): Promise<V | undefined> {
    return get<V>(key, this.storage)
  }

  set(key: K, value: V): Promise<void> {
    return set(key, value, this.storage)
  }

  delete(key: K): Promise<void> {
    return del(key, this.storage)
  }

  clear(): Promise<void> {
    return clear(this.storage)
  }

  entries(): Promise<[K, V][]> {
    return entries<K, V>(this.storage)
  }

  keys(): Promise<K[]> {
    return keys<K>(this.storage)
  }

  values(): Promise<V[]> {
    return values<V>(this.storage)
  }
}
