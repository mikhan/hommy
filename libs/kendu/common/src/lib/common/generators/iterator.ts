import { numberSequence } from './sequence'

export function* iteratorGenerator<T>(
  array: T[],
  indexGenerator?: Iterator<number, number, number | undefined>,
): Iterator<T, T, number | undefined> {
  indexGenerator ??= numberSequence(0, array.length - 1)
  let index: number | undefined = 0

  while (true) {
    index = yield array[indexGenerator.next(index).value]
  }
}
