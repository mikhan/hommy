import { Decorate } from './decorate'
import { Enumerable } from './enumerable'

describe('LazyProperty decorator', () => {
  it('should defer propery initialization', async () => {
    expect.hasAssertions()

    @Decorate()
    class Class {
      @Enumerable(true)
      property1 = 0

      @Enumerable(false)
      property2 = 0

      @Enumerable(true)
      get accesor1() {
        return 0
      }

      set accesor1(_value: number) {
        return
      }

      @Enumerable(false)
      get accesor2() {
        return 0
      }

      set accesor2(_value: number) {
        return
      }

      @Enumerable(true)
      method1() {
        return
      }

      @Enumerable(false)
      method2() {
        return
      }
    }

    const obj = new Class()

    expect(Object.getOwnPropertyDescriptor(obj, 'property1')?.enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(obj, 'property2')?.enumerable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(obj, 'accesor1')?.enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(obj, 'accesor2')?.enumerable).toBe(false)
    expect(Object.getOwnPropertyDescriptor(obj, 'method1')?.enumerable).toBe(true)
    expect(Object.getOwnPropertyDescriptor(obj, 'method2')?.enumerable).toBe(false)
  })
})
