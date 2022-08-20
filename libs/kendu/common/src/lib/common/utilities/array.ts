import { isObject } from './predicate'

export function findByProperty<T extends Record<string, unknown>>(
  array: T[],
  property: string,
  value: string,
): T | undefined {
  return array.find((data) => isObject(data) && String(data[property]) === value)
}

export function filterByProperty<T extends Record<string, unknown>>(array: T[], property: string, value: string): T[] {
  return array.filter((data) => isObject(data) && String(data[property]) === value)
}

export function filterByEntries<T>(array: T[], entries: Record<string, string | string[]>): T[] {
  const keys = Object.keys(entries)
  if (keys.length === 0) return array

  return array.filter((item) => {
    if (!isObject<Record<string, unknown>>(item)) return false

    for (const key of keys) {
      const value = entries[key]
      const test = String(item[key])
      const valid = Array.isArray(value) ? value.some((value) => value === test) : value === test

      if (!valid) return false
    }

    return true
  })
}

export function arrayIterator<T>(array: T[]): Iterator<T, T> {
  return array[Symbol.iterator]()
}
