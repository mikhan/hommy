import { itemSequence, numberSequence } from './sequence'

describe('numberSequence generator', () => {
  const generator = numberSequence(0, 3)

  it('should move current index', () => {
    expect.hasAssertions()

    expect(generator.next().value).toBe(0)
    expect(generator.next().value).toBe(1)
  })

  it('should set current index', () => {
    expect.hasAssertions()

    expect(generator.next(3).value).toBe(3)
  })

  it('should reset current index', () => {
    expect.hasAssertions()

    expect(generator.next().value).toBe(0)
  })

  it('should cycle between min and max values', () => {
    expect.hasAssertions()

    expect(generator.next(-1).value).toBe(3)
    expect(generator.next().value).toBe(0)
    expect(generator.next(4).value).toBe(0)
    expect(generator.next().value).toBe(1)
  })
})

describe('itemSequence generator', () => {
  const generator = itemSequence(['0A', '1A', '2A', '3A'])

  it('should move current index', () => {
    expect.hasAssertions()

    expect(generator.next().value).toBe('0A')
    expect(generator.next().value).toBe('1A')
  })

  it('should set current index', () => {
    expect.hasAssertions()

    expect(generator.next(3).value).toBe('3A')
  })

  it('should reset current index', () => {
    expect.hasAssertions()

    expect(generator.next().value).toBe('0A')
  })

  it('should cycle between min and max values', () => {
    expect.hasAssertions()

    expect(generator.next(-1).value).toBe('3A')
    expect(generator.next().value).toBe('0A')
    expect(generator.next(4).value).toBe('0A')
    expect(generator.next().value).toBe('1A')
  })
})
