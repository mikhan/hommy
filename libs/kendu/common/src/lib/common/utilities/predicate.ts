import { Subscription } from 'rxjs'
import { Constructor } from '../interfaces/constructor'
import { Primitive } from '../interfaces/primitive'
import { Subscribable } from '../interfaces/subscribable'
import { Unsubscribable } from '../interfaces/unsubscribable'

/** Primitive predicates */

export function isPrimitive(value: any): value is Primitive {
  return !isObject(value)
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return Number.isFinite(value)
}

export function isInteger(value: any): value is number {
  return isNumber(value) && value % 1 === 0
}

export function isPositive(value: any): value is number {
  return typeof value === 'number' && value > 0
}

export function isNegative(value: any): value is number {
  return typeof value === 'number' && value < 0
}

export function isBigint(value: any): value is bigint {
  return typeof value === 'bigint'
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}

export function isNull(value: any): value is null {
  return value === null
}

/** Object predicates */

export function isObject<T extends Record<string, any>>(value: any): value is T {
  return value === Object(value)
}

export function isFunction<T extends Function>(value: any): value is T {
  return typeof value === 'function'
}

export function isInstanceof<T>(value: any, constructor: Constructor<T>): value is T {
  return value instanceof constructor
}

export function isIterable<T extends Subscription>(value: any): value is T {
  return isObject(value) && hasMethod(value, Symbol.iterator)
}

export function isArrayLike<T>(value: any): value is ArrayLike<T> {
  return isObject(value) && isNumber(value['length'])
}

export function isSubscribable<T extends Subscribable<any>>(value: any): value is T {
  return hasMethod(value, 'subscribe')
}

export function isUnsubscribable<T extends Unsubscribable>(value: any): value is T {
  return hasMethod(value, 'unsubscribe')
}

/** Utilities */

export function hasProperty(value: any, propertyKey: string | symbol) {
  return !isNullable(value) && propertyKey in Object(value)
}

export function hasMethod(value: any, propertyKey: string | symbol) {
  return hasProperty(value, propertyKey) && isFunction(value[propertyKey])
}

export function isNullable(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return !isNullable(value)
}
