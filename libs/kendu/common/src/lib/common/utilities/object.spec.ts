import { getValue } from './object'

describe('getValue', () => {
  const testValue = {
    a: 'Apple',
    b: {
      b1: 'Beach',
    },
  }

  it('should find a value', () => {
    expect.hasAssertions()

    expect(getValue(testValue, '')).toStrictEqual(testValue)
    expect(getValue(testValue, 'a')).toStrictEqual(testValue.a)
    expect(getValue(testValue, 'b')).toStrictEqual(testValue.b)
    expect(getValue(testValue, 'b.b1')).toStrictEqual(testValue.b.b1)
  })

  it('should find a value with empty paths', () => {
    expect.hasAssertions()

    expect(getValue(testValue, '.')).toStrictEqual(testValue)
    expect(getValue(testValue, '..')).toStrictEqual(testValue)
    expect(getValue(testValue, '.b')).toStrictEqual(testValue.b)
    expect(getValue(testValue, '.b.')).toStrictEqual(testValue.b)
    expect(getValue(testValue, '.b..')).toStrictEqual(testValue.b)
    expect(getValue(testValue, '.b..b1..')).toStrictEqual(testValue.b.b1)
  })

  it('should not find a value', () => {
    expect.hasAssertions()

    expect(getValue(testValue, 'c')).toBeUndefined()
    expect(getValue(testValue, 'a.c')).toBeUndefined()
    expect(getValue(testValue, 'b.c')).toBeUndefined()
  })
})
