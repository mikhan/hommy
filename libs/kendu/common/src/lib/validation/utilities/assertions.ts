import { Observable, Subscription } from 'rxjs'
import { Type } from '../../common/interfaces/type'
import { AssertionException } from '../types/assertion-exception'
import {
  isArrayLike,
  isBigint,
  isBoolean,
  isFunction,
  isInstanceof,
  isNull,
  isNumber,
  isObject,
  isObservable,
  isString,
  isSubscription,
  isSymbol,
  isUndefined,
} from './predicate'

type AB<A, B> = A extends undefined ? B : A

// type Validator = (value: unknown, ...args: any[]) => boolean
type ExceptionGenerator = (message: string | undefined) => AssertionException
// type AssertionFunction = (value: unknown, ...args: any[]) => void

// export function createAssertion(
//   isValid: Validator,
//   generateException: ExceptionGenerator,
// ): (value: unknown, ...args: any[]) => void {
//   return function assert<T extends Error>(value: unknown, error?: Error | string): asserts value is T {
//     if (isValid(value)) return

//     throw isInstanceof(error, Error) ? error : generateException(error)
//   }
// }

function assert(success: boolean, error: string | Error | undefined, generateException: ExceptionGenerator) {
  if (success) return

  throw isInstanceof(error, Error) ? error : generateException(error)
}
/** Primitive assertions */

const assertIsStringException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of string`)

export function assertIsString(value: unknown, error?: string | Error): asserts value is string {
  assert(isString(value), error, assertIsStringException)
}

const assertIsNumberException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of number`)

export function assertIsNumber(value: unknown, error?: string | Error): asserts value is number {
  assert(isNumber(value), error, assertIsNumberException)
}

const assertIsBigintException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of bigInt`)

export function assertIsBigint(value: unknown, error?: string | Error): asserts value is bigint {
  assert(isBigint(value), error, assertIsBigintException)
}

const assertIsBooleanException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of boolean`)

export function assertIsBoolean(value: unknown, error?: string | Error): asserts value is boolean {
  assert(isBoolean(value), error, assertIsBooleanException)
}

const assertIsUndefinedException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of undefined`)

export function assertIsUndefined(value: unknown, error?: string | Error): asserts value is undefined {
  assert(isUndefined(value), error, assertIsUndefinedException)
}

const assertIsSymbolException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of symbol`)

export function assertIsSymbol(value: unknown, error?: string | Error): asserts value is symbol {
  assert(isSymbol(value), error, assertIsSymbolException)
}

const assertIsNullException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not type of null`)

export function assertIsNull(value: unknown, error?: string | Error): asserts value is null {
  assert(isNull(value), error, assertIsNullException)
}

/** Primivive type assertions */

const assertIsStringTypeException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not subtype of string`)

export function assertIsStringType<T extends string>(
  value: unknown,
  text?: T,
  error?: string | Error,
): asserts value is AB<T, string> {
  assertIsStringType(value)
  assert(value === text, error, assertIsStringTypeException)
}

const assertIsNumberTypeException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not subtype of number`)

export function assertIsNumberType<T extends number>(
  value: unknown,
  equalsTo?: T,
  error?: string | Error,
): asserts value is AB<T, number> {
  assertIsNumberType(value)
  assert(value === equalsTo, error, assertIsNumberTypeException)
}

const assertIsBigintTypeException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not subtype of bigInt`)

export function assertIsBigintType<T extends bigint>(
  value: unknown,
  equalsTo?: T,
  error?: string | Error,
): asserts value is AB<T, bigint> {
  assertIsBigintType(value)
  assert(value === equalsTo, error, assertIsBigintTypeException)
}

const assertIsBooleanTypeException: ExceptionGenerator = (error) =>
  new AssertionException(error ?? `Variable is not subtype of boolean`)

export function assertIsBooleanType<T extends boolean>(
  value: unknown,
  equalsTo?: T,
  error?: string | Error,
): asserts value is AB<T, boolean> {
  assertIsBooleanType(value)
  assert(value === equalsTo, error, assertIsBooleanTypeException)
}

/** Object assertions */

const assertIsObjectException: ExceptionGenerator = (message) =>
  new TypeError(message ?? `Variable is not of type object`)

export function assertIsObject<T extends Record<string, any>>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isObject(value), error, assertIsObjectException)
}

const assertIsFunctionException: ExceptionGenerator = (message) =>
  new TypeError(message ?? `Variable is not of type function`)

export function assertIsFunction<T extends Function>(value: unknown, error?: string | Error): asserts value is T {
  assert(isFunction(value), error, assertIsFunctionException)
}

const assertIsArrayLikeException: ExceptionGenerator = (message) =>
  new TypeError(message ?? `Variable is not instance of Observable`)

export function assertIsArrayLike<T>(value: unknown, error?: string | Error): asserts value is ArrayLike<T> {
  assert(isArrayLike(value), error, assertIsArrayLikeException)
}

const assertIsInstanceofException: ExceptionGenerator = (message) =>
  new TypeError(message ?? `Variable is not instance of class`)

export function assertIsInstanceof<T>(
  value: unknown,
  Constructor: Type<T>,
  error?: string | Error,
): asserts value is T {
  assert(isInstanceof(value, Constructor), error, assertIsInstanceofException)
}

const assertIsObservableException: ExceptionGenerator = (message) =>
  new TypeError(message ?? `Variable is not instance of Observable`)

export function assertIsObservable<T extends Observable<unknown>>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isObservable(value), error, assertIsObservableException)
}

const assertIsSubscriptionException: ExceptionGenerator = (message) =>
  new AssertionException(message ?? `Variable is not instance of Subscription`)

export function assertIsSubscription<T extends Subscription>(
  value: unknown,
  error?: string | Error,
): asserts value is T {
  assert(isSubscription(value), error, assertIsSubscriptionException)
}
