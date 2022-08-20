import { PseudoRandomGenerator } from '../classes/pseudo-random-generator'
import { iteratorGenerator } from './iterator'

export function* randomNumber(
  min = 0,
  max = Infinity,
  precision = 2,
  seed?: number,
): Generator<number, number, number> {
  const generator = new PseudoRandomGenerator({ min, max, seed, precision })

  while (true) {
    yield generator.next()
  }
}

export function randomInteger(min = 0, max = Infinity, seed?: number): Iterator<number, number, number> {
  return randomNumber(min, max, 0, seed)
}

export function randomItem<T>(array: T[], seed?: number): Iterator<T, T, number> {
  const indexGenerator = randomNumber(0, array.length - 1, 0, seed)

  return iteratorGenerator(array, indexGenerator)
}
