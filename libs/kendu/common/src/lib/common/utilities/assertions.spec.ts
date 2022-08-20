import { of } from 'rxjs'
import {
  assertIsString,
  assertIsNumber,
  assertIsBigint,
  assertIsBoolean,
  assertIsUndefined,
  assertIsSymbol,
  assertIsNull,
  assertIsObject,
  assertIsFunction,
  assertIsArrayLike,
  assertIsInstanceof,
  assertIsObservable,
  assertIsSubscription,
  assertIsArray,
  assertIsIterable,
} from './assertions'

describe('Assertion functions', () => {
  it('should not throw error', () => {
    expect.assertions(15)

    let notDefined: undefined
    const observable = of(0)
    const subscription = observable.subscribe()

    function* generator() {
      yield 0
    }

    expect(() => assertIsString('string')).not.toThrow()
    expect(() => assertIsNumber(0)).not.toThrow()
    expect(() => assertIsBigint(0n)).not.toThrow()
    expect(() => assertIsBoolean(false)).not.toThrow()
    expect(() => assertIsUndefined(notDefined)).not.toThrow()
    expect(() => assertIsSymbol(Symbol('symbol'))).not.toThrow()
    expect(() => assertIsNull(null)).not.toThrow()
    expect(() => assertIsArray([])).not.toThrow()
    expect(() => assertIsIterable(generator())).not.toThrow()
    expect(() => assertIsObject({})).not.toThrow()
    expect(() => assertIsFunction(() => true)).not.toThrow()
    expect(() => assertIsArrayLike([])).not.toThrow()
    expect(() => assertIsInstanceof(new Date(), Date)).not.toThrow()
    expect(() => assertIsObservable(observable)).not.toThrow()
    expect(() => assertIsSubscription(subscription)).not.toThrow()
  })

  it('should throw error', () => {
    expect.assertions(15)

    expect(() => assertIsString(0)).toThrow(`Value must be of type string`)
    expect(() => assertIsNumber('0')).toThrow(`Value must be of type number`)
    expect(() => assertIsBigint(0)).toThrow(`Value must be of type bigInt`)
    expect(() => assertIsBoolean(0)).toThrow(`Value must be of type boolean`)
    expect(() => assertIsUndefined(0)).toThrow(`Value must be of type undefined`)
    expect(() => assertIsSymbol(0)).toThrow(`Value must be of type symbol`)
    expect(() => assertIsNull(0)).toThrow(`Value must be of type null`)
    expect(() => assertIsArray(0)).toThrow(`Value must be an array`)
    expect(() => assertIsIterable(0)).toThrow(`Value must implement the iterable protocol`)
    expect(() => assertIsObject(0)).toThrow(`Value must be of type object`)
    expect(() => assertIsFunction(0)).toThrow(`Value must be of type function`)
    expect(() => assertIsArrayLike(0)).toThrow(`Value must be an object with a length property`)
    expect(() => assertIsInstanceof(0, class {})).toThrow(`Value must be instance of class`)
    expect(() => assertIsObservable(0)).toThrow(`Value must be instance of Observable`)
    expect(() => assertIsSubscription(0)).toThrow(`Value must be instance of Subscription`)
  })
})
