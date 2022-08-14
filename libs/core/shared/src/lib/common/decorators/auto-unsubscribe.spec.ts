import { Subject, Subscription } from 'rxjs'
import { AutoUnsubscribe } from './auto-unsubscribe'

describe('AutoUnsubscribe decorator', () => {
  it('should create method in class if not exists', () => {
    expect.assertions(1)

    @AutoUnsubscribe()
    class TestClass {}

    const testClass = new TestClass()

    expect(testClass).toHaveProperty('ngOnDestroy')
  })

  it('should unsubscribe of class subscriptions when method called', () => {
    expect.assertions(4)

    const subject = new Subject()

    @AutoUnsubscribe({ event: 'destroy' })
    class TestClass {
      subs1 = subject.subscribe()
      subs2!: Subscription

      destroy() {
        return
      }
    }

    const testClass = new TestClass()
    testClass.subs2 = subject.subscribe()

    expect(testClass.subs1.closed).toBe(false)
    expect(testClass.subs2.closed).toBe(false)

    testClass.destroy()

    expect(testClass.subs1.closed).toBe(true)
    expect(testClass.subs2.closed).toBe(true)
  })
})
