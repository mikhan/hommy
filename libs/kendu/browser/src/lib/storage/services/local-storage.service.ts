import { inject } from '@angular/core'
import { isString, Prefixer } from '@decet/kendu-common'
import { KeyvalStorage } from '../interfaces/keyval-storage'
import { JsonSerializerService } from './json-serializer.service'

export abstract class LocalStorageService<V> implements KeyvalStorage<string, V> {
  protected abstract namespace: string

  private storage = localStorage

  private serializer = inject(JsonSerializerService)

  private _prefixer?: Prefixer
  private get prefixer() {
    this._prefixer ??= new Prefixer(this.namespace)

    return this._prefixer
  }

  async get(key: string): Promise<V | undefined> {
    key = this.prefixer.prefix(key)
    const value = this.storage.getItem(key)

    return isString(value) ? this.serializer.unserialize(value) : undefined
  }

  async set(key: string, value: V): Promise<void> {
    key = this.prefixer.prefix(key)
    return this.storage.setItem(key, this.serializer.serialize(value))
  }

  async delete(key: string): Promise<void> {
    key = this.prefixer.prefix(key)
    return this.storage.removeItem(key)
  }

  async clear(): Promise<void> {
    return this.storage.clear()
  }

  async entries() {
    const { prefixer } = this
    const entries = Object.entries(this.storage)

    return entries
      .filter(([key]) => prefixer.matches(key))
      .map(([key, value]) => [prefixer.unprefix(key), this.serializer.unserialize(value)])
  }

  async keys() {
    const { prefixer } = this
    const keys = Object.keys(this.storage)

    return keys.filter((key) => prefixer.matches(key)).map((key) => prefixer.unprefix(key))
  }

  async values() {
    const { prefixer, serializer } = this
    const entries = Object.entries(this.storage)

    return entries.filter(([key]) => prefixer.matches(key)).map(([, value]) => serializer.unserialize(value))
  }
}
