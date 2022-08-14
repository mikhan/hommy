export function* numberGenerator(min = 0, max = Infinity): Generator<number, number, number | undefined> {
  const size = max - min + 1
  let index = 0
  while (true) {
    index = min + (index % size)
    index = (yield index) ?? ++index
    index = (index < min ? index + size : index) - min
  }
}

export function* randomGenerator(min = 0, max = 1, precision = 2, seed?: number): Generator<number, number, number> {
  const m = 0x80000000 // 2**31;
  const a = 1103515245
  const c = 12345
  const dif = max - min
  const pow = 10 ** precision

  let state = seed ?? Math.floor(Math.random() * (m - 1))

  while (true) {
    state = (a * state + c) % m
    const value = state / (m - 1)
    yield Math.round((min + value * dif) * pow) / pow
  }
}

export function randomIntGenerator(min = 0, max = 1, seed?: number): Iterator<number, number, number> {
  return randomGenerator(min, max, 0, seed)
}

export function randomSequence<T>(array: T[], seed?: number): Iterator<T, T, number> {
  const indexGenerator = randomGenerator(0, array.length - 1, 0, seed)
  return sequenceIterator(array, indexGenerator)
}

export function arraySequence<T>(array: T[]): Iterator<T, T, number> {
  const indexGenerator = numberGenerator(0, array.length - 1)
  return sequenceIterator(array, indexGenerator)
}

export function* sequenceIterator<T>(
  array: T[],
  indexGenerator?: Iterator<number, number, number | undefined>,
): Iterator<T, T, number | undefined> {
  indexGenerator ??= numberGenerator(0, array.length - 1)
  let index: number | undefined = 0
  while (true) {
    index = yield array[indexGenerator.next(index).value]
  }
}

export function arrayIterator<T>(array: T[]): Iterator<T, T> {
  return array[Symbol.iterator]()
}

// export function randomize<T>(iterable: Iterator<T, void, number>){
//   const indexGenerator = randomGenerator(0, iterable.length - 1)

// }

// export function* arraySequence<T>(iterable: Iterable<T>): Generator<T, void, number | undefined> {
//   if(Array.isArray(iterable))

//   const indexGenerator = rangeSequence(0, iterable.length - 1)
//   const sequenceGenerator = iterable[Symbol.iterator]()

//   const x = indexGenerator[Symbol.iterator]().next()
//   const y = sequenceGenerator[Symbol.iterator]().next()

//   let index: number | undefined = 0

//   while (true) {
//     index = indexGenerator.next(index).value
//     index = yield sequenceGenerator.next().value
//   }
// }

// export function randomize()
