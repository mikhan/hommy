import { arraySequence, numberGenerator } from './random'

describe('rangeSequence generator', () => {
  it('should create generator', () => {
    expect.hasAssertions()

    const generator = numberGenerator(5, 9)

    expect(generator.next().value).toBe(5)
    expect(generator.next().value).toBe(6)
    expect(generator.next(8).value).toBe(8)
    expect(generator.next().value).toBe(9)
    expect(generator.next(4).value).toBe(9)
    expect(generator.next(5).value).toBe(5)
    expect(generator.next().value).toBe(6)
    expect(generator.next(10).value).toBe(5)
    expect(generator.next().value).toBe(6)
    expect(generator.next(11).value).toBe(6)
    expect(generator.next().value).toBe(7)
    expect(generator.next().value).toBe(8)
    expect(generator.next().value).toBe(9)
    expect(generator.next().value).toBe(5)
    expect(generator.next().value).toBe(6)
    expect(generator.next().value).toBe(7)
  })
})

describe('arraySequence generator', () => {
  it('should create generator', () => {
    expect.hasAssertions()

    const generator = arraySequence(['5A', '6A', '7A', '8A', '9A'])

    expect(generator.next().value).toBe('5A')
    expect(generator.next().value).toBe('6A')
    expect(generator.next(8).value).toBe('8A')
    expect(generator.next().value).toBe('9A')
    expect(generator.next(4).value).toBe('9A')
    expect(generator.next(5).value).toBe('5A')
    expect(generator.next().value).toBe('6A')
    expect(generator.next(10).value).toBe('5A')
    expect(generator.next().value).toBe('6A')
    expect(generator.next(11).value).toBe('6A')
    expect(generator.next().value).toBe('7A')
    expect(generator.next().value).toBe('8A')
    expect(generator.next().value).toBe('9A')
    expect(generator.next().value).toBe('5A')
    expect(generator.next().value).toBe('6A')
    expect(generator.next().value).toBe('7A')
  })
})
