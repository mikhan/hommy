import { randomInteger, randomItem, randomNumber } from './random'

const SEED = 2

describe('randomInteger generator', () => {
  it('should generate pseudo random numbers', () => {
    expect.hasAssertions()

    const generator = randomNumber(-1, 1, 2, SEED)

    expect(generator.next().value).toBe(-0.94)
    expect(generator.next().value).toBe(0.39)
    expect(generator.next().value).toBe(-0.38)
    expect(generator.next().value).toBe(0.76)
    expect(generator.next().value).toBe(-0.01)
    expect(generator.next().value).toBe(0.17)
    expect(generator.next().value).toBe(0.97)
    expect(generator.next().value).toBe(-0.42)
    expect(generator.next().value).toBe(-0.73)
    expect(generator.next().value).toBe(0.51)
  })

  it('should generate pseudo random integers', () => {
    expect.hasAssertions()

    const generator = randomInteger(-10, 10, SEED)

    expect(generator.next().value).toBe(-9)
    expect(generator.next().value).toBe(4)
    expect(generator.next().value).toBe(-4)
    expect(generator.next().value).toBe(8)
    expect(generator.next().value).toBe(-0)
    expect(generator.next().value).toBe(2)
    expect(generator.next().value).toBe(10)
    expect(generator.next().value).toBe(-4)
    expect(generator.next().value).toBe(-7)
    expect(generator.next().value).toBe(5)
  })

  it('should generate pseudo random item', () => {
    expect.hasAssertions()

    const generator = randomItem('ABCDEFGHIJ'.split(''), SEED)

    expect(generator.next().value).toBe('A')
    expect(generator.next().value).toBe('G')
    expect(generator.next().value).toBe('D')
    expect(generator.next().value).toBe('I')
    expect(generator.next().value).toBe('E')
    expect(generator.next().value).toBe('F')
    expect(generator.next().value).toBe('J')
    expect(generator.next().value).toBe('D')
    expect(generator.next().value).toBe('B')
    expect(generator.next().value).toBe('H')
  })
})
