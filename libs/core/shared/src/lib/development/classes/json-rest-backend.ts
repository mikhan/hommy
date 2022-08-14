import { findByKey } from '../../common/utilities/array'
import { getValue } from '../../common/utilities/object'
import { filterBySearchParams } from '../../common/utilities/url'
import { isString } from '../../validation/utilities/predicate'

export class JSONRestBackend {
  constructor(private data: unknown) {}

  get(url: string | URL): unknown {
    if (isString(url)) url = new URL(url)

    const segments = url.pathname.split('/')
    let value = getValue(this.data, segments, this.selectValue)

    if (Array.isArray(value) && url.search) {
      value = filterBySearchParams(value, url.searchParams)
    }

    return value
  }

  private selectValue(object: Record<string, unknown>, key: string) {
    return Array.isArray(object) ? findByKey(object, 'id', key) : object[key]
  }
}
