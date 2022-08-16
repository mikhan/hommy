// export function* randomGenerator(
//   min: number,
//   max: number,
//   precision = 2,
//   seed?: number,
// ): Generator<number, number, void> {
//   const m = 0x80000000 // 2**31;
//   const a = 1103515245
//   const c = 12345
//   const diff = max - min
//   const pow = 10 ** precision

//   let state = seed ?? Math.floor(Math.random() * (m - 1))

//   while (true) {
//     state = (a * state + c) % m
//     const value = state / (m - 1)
//     yield Math.round((min + value * diff) * pow) / pow
//   }
// }

// export function randomArraySequence<T>(list: T[], seed?: number): () => T {
//   const rng = randomGenerator(0, list.length - 1, 0, seed)
//   return () => list[rng.next().value]
// }

// // export function randomRangeSequence(min: number, max: number, seed?: number): () => number {
// //   const list = rangeSequence(min, max)
// //   const rng = randomGenerator(0, list.length - 1, 0, seed)
// //   return () => list(rng.next().value)
// // }

// export function rangeSequence(min: number, max: number): (index?: number) => number {
//   let i = min
//   return function (index: number = i) {
//     i = min + (index % (max - min + 1))
//     return i++
//   }
// }

// export function arraySequence<T>(list: T[]): (index?: number) => T {
//   const next = rangeSequence(0, list.length - 1)
//   return (index?: number) => list[next(index)]
// }

export function mapSequence<T, R>(
  next: (index?: number) => T,
  callback: (value: T, index: number) => R,
): (index?: number) => R {
  let i = 0
  return (index?: number) => callback(next(index), i++)
}
