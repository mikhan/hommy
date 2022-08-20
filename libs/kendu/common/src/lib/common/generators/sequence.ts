import { iteratorGenerator } from './iterator'

export function* numberSequence(min = 0, max = Infinity): Generator<number, number, number | undefined> {
  const size = max - min + 1
  let index = 0

  while (true) {
    index = min + (index % size)
    index = (yield index) ?? ++index
    index = (index < min ? index + size : index) - min
  }
}

export function itemSequence<T>(array: T[]): Iterator<T, T, number> {
  const indexGenerator = numberSequence(0, array.length - 1)

  return iteratorGenerator(array, indexGenerator)
}
