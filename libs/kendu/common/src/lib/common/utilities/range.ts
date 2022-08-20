export function range(start: number, end: number, step?: number, mapFnc?: (value: number) => any) {
  return [...rangeGenerator(start, end, step, mapFnc)]
}

function* rangeGenerator(start: number, end: number, step?: number, mapFnc?: (value: number) => any) {
  step ??= Math.sign(end - start)

  do {
    yield mapFnc ? mapFnc(start) : start
    start += step
  } while ((step > 0 && end >= start) || (step < 0 && end <= start))
}
