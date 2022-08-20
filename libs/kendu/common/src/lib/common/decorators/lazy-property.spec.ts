import { LazyProperty } from './lazy-property'

let i: number
const fnc = jest.fn(() => ++i)

function createClass() {
  i = 0
  fnc.mockClear()

  class Class {
    // @LazyProperty(() => fnc())
    // static prop = 0

    @LazyProperty(() => fnc())
    prop: number = LazyProperty.setValue()
  }

  return Class
}

describe('LazyProperty decorator', () => {
  it('should defer propery initialization', async () => {
    expect.hasAssertions()

    const TestClass = createClass()
    const obj = new TestClass()

    expect(Object.getOwnPropertyDescriptor(obj, 'prop')).toBeDefined()

    const result = [obj.prop, obj.prop]

    expect(fnc).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual([1, 1])

    expect(Object.getOwnPropertyDescriptor(obj, 'prop')).toBeDefined()
  })

  it('should store value by instance', async () => {
    expect.hasAssertions()

    const TestClassA = createClass()
    const objA1 = new TestClassA()
    const objA2 = new TestClassA()

    const TestClassB = createClass()
    const objB1 = new TestClassB()

    const TestClassC = createClass()
    const objC1 = new TestClassC()

    const result = [objA1.prop, objA2.prop, objB1.prop, objC1.prop]

    expect(fnc).toHaveBeenCalledTimes(4)
    expect(result).toStrictEqual([1, 2, 3, 4])
  })
})
