import { isUndefined } from './predicate'

export function coerceBoolean(value: unknown): boolean {
  return value != null && `${value}` !== 'false'
}

export function coerceNumber(value: any): number
export function coerceNumber<D>(value: any, fallback: D): number | D
export function coerceNumber(value: any, fallbackValue = 0) {
  return isNumberLike(value) ? Number(value) : fallbackValue
}

export function coerceArray<T>(value: T | T[] | undefined): T[]
export function coerceArray<T>(value: T | readonly T[] | undefined): readonly T[]
export function coerceArray<T>(value: T | T[] | undefined): T[] {
  return Array.isArray(value) ? value : isUndefined(value) ? [] : [value]
}

export function coerceStringArray(value: unknown, separator: string | RegExp = /\s+/): string[] {
  if (value === null) return []

  const result = []
  const values = Array.isArray(value) ? value : `${value}`.split(separator)

  for (const value of values) {
    const trimmed = `${value}`.trim()
    if (trimmed) result.push(trimmed)
  }

  return result
}

function isNumberLike(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && !isNaN(Number(value))
}
