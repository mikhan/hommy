import { isObject } from './predicate'

type GetValueSelector = (object: Record<string, unknown>, key: string) => unknown

export function getValue<T>(
  object: unknown,
  path: string | string[],
  selector: GetValueSelector = (object, key) => object[key],
): T | undefined {
  const segments = Array.isArray(path) ? path : path.split('.')

  for (const key of segments) {
    if (key === '') continue
    if (!isObject(object)) return
    object = selector(object, key)
  }

  return object as T
}
