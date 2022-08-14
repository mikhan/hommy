import { Debounce } from './debounce'

function intervalCall<V>(fnc: (arg: V) => void, args: V[], delay: number) {
  jest.useFakeTimers()
  const values = [...args]

  const interval = setInterval(() => {
    const value = values.shift()
    if (value) {
      fnc(value)
    } else {
      clearInterval(interval)
      jest.useRealTimers()
    }
  }, delay)

  jest.runAllTimers()
}

describe('Debounce decorator', () => {
  const values = Array.from({ length: 11 }, (_, index) => index + 1)
  const expected = [values[values.length - 1]]

  it('should debounce class method calls', () => {
    expect.hasAssertions()

    class TestClass {
      values: unknown[] = []

      @Debounce(1000)
      add(value: number) {
        this.values.push(value)
      }
    }

    const testClass = new TestClass()
    intervalCall((value: number) => testClass.add(value), values, 500)
    expect(testClass.values).toStrictEqual(expected)
  })

  it('should debounce class setter calls', () => {
    expect.hasAssertions()

    class TestClass {
      _values: number[] = []

      @Debounce(1000)
      set values(value: number) {
        this._values.push(value)
      }
    }

    const testClass = new TestClass()
    intervalCall((value: number) => (testClass.values = value), values, 500)
    expect(testClass._values).toStrictEqual(expected)
  })

  it('should debounce class getter calls', async () => {
    expect.hasAssertions()

    const fnc = jest.fn()

    class TestClass {
      @Debounce(1000)
      get value() {
        return fnc()
      }
    }

    const testClass = new TestClass()

    intervalCall(() => testClass.value, values, 500)
    expect(fnc).toHaveBeenCalledTimes(1)
  })
})
