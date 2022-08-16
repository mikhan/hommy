import { Observable, Subscription } from 'rxjs'
import { AnyPrimitive } from '../../common/interfaces/any-primitive'
import { Type } from '../../common/interfaces/type'

/** Primitive predicates */

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isBigint(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export function isNull(value: unknown): value is null {
  return typeof value === null
}

/** Primivive type predicate */

export function isPrimitive(value: unknown): value is AnyPrimitive {
  return !isObject(value)
}

export function isStringType<T extends string>(
  value: unknown,
  equalsTo?: T,
): value is T extends undefined ? string : T {
  return typeof value === 'string' && (isUndefined(equalsTo) || value === equalsTo)
}

export function isNumberType<T extends number>(
  value: unknown,
  equalsTo?: T,
): value is T extends undefined ? number : T {
  return typeof value === 'number' && (isUndefined(equalsTo) || value === equalsTo)
}

export function isBigintType<T extends bigint>(
  value: unknown,
  equalsTo?: T,
): value is T extends undefined ? bigint : T {
  return typeof value === 'bigint' && (isUndefined(equalsTo) || value === equalsTo)
}

export function isBooleanType<T extends boolean>(
  value: unknown,
  equalsTo?: T,
): value is T extends undefined ? boolean : T {
  return typeof value === 'boolean' && (isUndefined(equalsTo) || value === equalsTo)
}

/** Object predicates */

export function isObject<T extends Record<string, any>>(value: unknown): value is T {
  return value === Object(value)
}

export function isFunction<T extends Function>(value: unknown): value is T {
  return typeof value === 'function'
}

export function isArrayLike<T>(value: unknown): value is ArrayLike<T> {
  return isObject(value) && typeof value['length'] === 'number' && typeof value !== 'function'
}

export function isInstanceof<T>(value: unknown, Constructor: Type<T>): value is T {
  return value instanceof Constructor
}

export function isObservable<T extends Observable<unknown>>(value: unknown): value is T {
  return isObject(value) && value instanceof Observable
}

export function isSubscription<T extends Subscription>(value: unknown): value is T {
  return isObject(value) && 'unsubscribe' in value && isFunction(value['unsubscribe'])
}
