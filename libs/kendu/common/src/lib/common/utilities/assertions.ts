import { Observable, Subscription } from 'rxjs'
import { Constructor } from '../interfaces/constructor'
import {
  isArrayLike,
  isBigint,
  isBoolean,
  isFunction,
  isInstanceof,
  isIterable,
  isNull,
  isNumber,
  isObject,
  isSubscribable,
  isString,
  isUnsubscribable,
  isSymbol,
  isUndefined,
} from './predicate'

export function assert(assertion: boolean, error: string | Error) {
  if (assertion) return

  throw isString(error) ? new TypeError(error) : error
}

/** Primitive assertions */

export function assertIsString(value: unknown, error?: string | Error): asserts value is string {
  assert(isString(value), error ?? `Value must be of type string`)
}

export function assertIsNumber(value: unknown, error?: string | Error): asserts value is number {
  assert(isNumber(value), error ?? `Value must be of type number`)
}

export function assertIsBigint(value: unknown, error?: string | Error): asserts value is bigint {
  assert(isBigint(value), error ?? `Value must be of type bigInt`)
}

export function assertIsBoolean(value: unknown, error?: string | Error): asserts value is boolean {
  assert(isBoolean(value), error ?? `Value must be of type boolean`)
}

export function assertIsUndefined(value: unknown, error?: string | Error): asserts value is undefined {
  assert(isUndefined(value), error ?? `Value must be of type undefined`)
}

export function assertIsSymbol(value: unknown, error?: string | Error): asserts value is symbol {
  assert(isSymbol(value), error ?? `Value must be of type symbol`)
}

export function assertIsNull(value: unknown, error?: string | Error): asserts value is null {
  assert(isNull(value), error ?? `Value must be of type null`)
}

export function assertIsArray<T>(value: unknown, error?: string | Error): asserts value is T[] {
  assert(Array.isArray(value), error ?? `Value must be an array`)
}

/** Object assertions */

export function assertIsObject<T extends Record<string, any>>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isObject(value), error ?? `Value must be of type object`)
}

export function assertHasProperty<T extends Record<string, any>, P extends string>(
  value: unknown,
  property: P,
  error?: string | Error,
): asserts value is T & Record<P, unknown> {
  assertIsObject(value, error)
  assert(property in value, error ?? `Object must have a property of name ${property}`)
}

export function assertIsFunction<T extends Function>(value: unknown, error?: string | Error): asserts value is T {
  assert(isFunction(value), error ?? `Value must be of type function`)
}

export function assertIsArrayLike<T>(value: unknown, error?: string | Error): asserts value is T[] {
  assert(isArrayLike(value), error ?? `Value must be an object with a length property`)
}

export function assertIsIterable<T>(value: unknown, error?: string | Error): asserts value is T[] {
  assert(isIterable(value), error ?? `Value must implement the iterable protocol`)
}

export function assertIsInstanceof<T>(
  value: unknown,
  constructor: Constructor<T>,
  error?: string | Error,
): asserts value is T {
  assert(isInstanceof(value, constructor), error ?? `Value must be instance of class`)
}

export function assertIsObservable<T extends Observable<unknown>>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isSubscribable(value), error ?? `Value must be instance of Observable`)
}

export function assertIsSubscription<T extends Subscription>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isUnsubscribable(value), error ?? `Value must be instance of Subscription`)
}
