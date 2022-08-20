import { of } from 'rxjs'
import {
  isPrimitive,
  isString,
  isNumber,
  isInteger,
  isPositive,
  isNegative,
  isBigint,
  isBoolean,
  isUndefined,
  isSymbol,
  isNull,
  isObject,
  isInstanceof,
  isFunction,
  isIterable,
  isArrayLike,
  isSubscribable,
  isUnsubscribable,
  hasProperty,
  hasMethod,
  isNullable,
  isNonNullable,
} from './predicate'

describe('Predicate functions', () => {
  it('should detect primitive values', () => {
    expect.hasAssertions()

    expect(isPrimitive('0')).toBe(true)
    expect(isPrimitive(0)).toBe(true)
    expect(isPrimitive(0n)).toBe(true)
    expect(isPrimitive(false)).toBe(true)
    expect(isPrimitive(Symbol.iterator)).toBe(true)

    expect(isString(String('0'))).toBe(true)
    expect(isNumber(Number(0))).toBe(true)
    expect(isBigint(BigInt('0'))).toBe(true)
    expect(isBoolean(Boolean(0))).toBe(true)
    expect(isSymbol(Symbol('symbol'))).toBe(true)

    expect(isPrimitive({})).toBe(false)
  })

  it('should detect integer numbers', () => {
    expect.hasAssertions()

    expect(isInteger(1)).toBe(true)
    expect(isInteger(1.0)).toBe(true)
    expect(isInteger(1.1)).toBe(false)
    expect(isInteger(Infinity)).toBe(false)
  })

  it('should detect positive numbers', () => {
    expect.hasAssertions()

    expect(isPositive(Infinity)).toBe(true)
    expect(isPositive(1)).toBe(true)
    expect(isPositive(0)).toBe(false)
    expect(isPositive(-1)).toBe(false)
    expect(isPositive(-Infinity)).toBe(false)
  })

  it('should detect negative numbers', () => {
    expect.hasAssertions()

    expect(isNegative(-Infinity)).toBe(true)
    expect(isNegative(-1)).toBe(true)
    expect(isNegative(0)).toBe(false)
    expect(isNegative(1)).toBe(false)
    expect(isNegative(Infinity)).toBe(false)
  })

  it('should detect object types', () => {
    expect.hasAssertions()

    const observable = of(0)
    const subscription = observable.subscribe()
    const iterator = {
      next() {
        return {}
      },
      [Symbol.iterator]() {
        return this
      },
    }

    function* generator() {
      yield 0
    }

    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(Object())).toBe(true)
    expect(isObject(null)).toBe(false)

    expect(isFunction(() => ({}))).toBe(true)
    expect(isFunction(new Function())).toBe(true)
    expect(isFunction([]['push'])).toBe(true)
    expect(isFunction([]['length'])).toBe(false)

    expect(isIterable(generator())).toBe(true)
    expect(isIterable(iterator)).toBe(true)
    expect(isIterable({})).toBe(false)

    expect(isArrayLike([])).toBe(true)
    expect(isArrayLike({ length: 0 })).toBe(true)
    expect(isArrayLike({})).toBe(false)

    expect(isSubscribable(observable)).toBe(true)
    expect(isUnsubscribable(subscription)).toBe(true)

    expect(isInstanceof([], Array)).toBe(true)
    expect(isInstanceof({ length: 0 }, Array)).toBe(false)

    expect(hasProperty([], 'push')).toBe(true)
    expect(hasProperty([], 'length')).toBe(true)
    expect(hasProperty([], 'other')).toBe(false)
    expect(hasProperty(undefined, 'other')).toBe(false)

    expect(hasMethod([], 'push')).toBe(true)
    expect(hasMethod([], 'length')).toBe(false)
    expect(hasMethod([], 'other')).toBe(false)
    expect(hasMethod(undefined, 'other')).toBe(false)
  })

  it('should detect nullable values', () => {
    expect.hasAssertions()

    expect(isUndefined(undefined)).toBe(true)
    expect(isNullable(undefined)).toBe(true)
    expect(isNonNullable(undefined)).toBe(false)
    expect(isNull(undefined)).toBe(false)

    expect(isNull(null)).toBe(true)
    expect(isNullable(null)).toBe(true)
    expect(isNonNullable(null)).toBe(false)
    expect(isUndefined(null)).toBe(false)
  })
})
