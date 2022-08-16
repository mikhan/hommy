import { isObject } from '../../validation/utilities/predicate'

export function findByKey<T extends Record<string, unknown>>(
  array: T[],
  property: string,
  value: string,
): T | undefined {
  return array.find((data) => isObject(data) && String(data[property]) === value)
}

export function filterByEntries<T>(array: T[], entries: [keyof T, string][]): T[] {
  if (entries.length === 0) return array

  return array.filter((item) => {
    if (!isObject<Record<string, unknown>>(item)) return false

    for (const [key, value] of entries) {
      if (!(String(item[key]) === value)) return false
    }

    return true
  })
}
