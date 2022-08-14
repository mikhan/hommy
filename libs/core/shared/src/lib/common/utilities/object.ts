import { isObject } from '../../validation/utilities/predicate'

export function getValue<T>(
  object: unknown,
  path: string | string[],
  selector?: (object: Record<string, unknown>, key: string) => unknown,
): T | undefined {
  selector ??= (object, key) => object[key]

  const segments = Array.isArray(path) ? path : path.split('.')

  for (const key of segments) {
    if (key === '') continue
    if (!isObject(object)) return
    object = selector(object, key)
  }

  return object as T
}
