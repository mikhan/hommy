import { Memoize } from './memoize'

let i: number
const fnc = jest.fn((name: string) => name + '-' + String(++i))

function createClass() {
  i = 0
  fnc.mockClear()

  class Class {
    @Memoize()
    method(name: string) {
      return fnc(name)
    }
  }

  return Class
}

describe('Memoize decorator', () => {
  it('should memoize method result', async () => {
    expect.hasAssertions()

    const TestClass = createClass()
    const obj = new TestClass()

    expect(Object.getOwnPropertyDescriptor(obj, 'method')).toBeUndefined()
    const result = [obj.method('a'), obj.method('a'), obj.method('b'), obj.method('b')]

    expect(fnc).toHaveBeenCalledTimes(2)
    expect(result).toStrictEqual(['a-1', 'a-1', 'b-2', 'b-2'])

    expect(Object.getOwnPropertyDescriptor(obj, 'method')).toBeUndefined()
  })

  it('should share value by class instance of same class', async () => {
    expect.hasAssertions()

    const TestClassA = createClass()
    const objA1 = new TestClassA()
    const objA2 = new TestClassA()

    const TestClassB = createClass()
    const objB1 = new TestClassB()

    const TestClassC = createClass()
    const objC1 = new TestClassC()

    const result = [objA1.method('c'), objA2.method('c'), objB1.method('c'), objC1.method('c')]

    expect(fnc).toHaveBeenCalledTimes(3)
    expect(result).toStrictEqual(['c-1', 'c-1', 'c-2', 'c-3'])
  })
})
