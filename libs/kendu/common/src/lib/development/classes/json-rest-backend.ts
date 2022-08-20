import { getValue } from '../../common/utilities/object'
import { isObject, isString } from '../../common/utilities/predicate'
import { filterBySearchParams } from '../../common/utilities/url'
import { JSONBackend } from '../interfaces/backend'

export class JSONRestBackend implements JSONBackend {
  constructor(private data: unknown) {}

  get(url: string | URL) {
    if (isString(url)) url = new URL(url)

    const segments = url.pathname.split('/')
    let value = getValue<object | object[]>(this.data, segments, selectValue)

    if (Array.isArray(value) && url.search) {
      value = filterBySearchParams(value, url.searchParams)
    }

    return value
  }

  set(url: string, value: object): void {
    console.log(url, value)
  }

  has(url: string): boolean {
    return !!this.get(url)
  }
}

function selectValue(data: Record<string, unknown>, key: string) {
  return Array.isArray(data) ? data.find((data) => isObject(data) && String(data['id']) === key) : data[key]
}
