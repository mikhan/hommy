import { isNumber } from './predicate'

export interface Options<T extends unknown[]> {
  goal: number
  fnc: (...args: T) => number
  params: T
  paramsVariable: number
  maxIterations?: number
  tolerance: number | ((value: number) => boolean)
}

export function goalSeek<T extends unknown[]>(options: Options<T>): number {
  const results: number[] = []
  const { goal, fnc, params, paramsVariable: varIndex } = options
  const { tolerance, maxIterations = 100 } = options

  if (!tolerance) throw new Error('invalid inputs')

  const matches = isNumber(tolerance) ? (n: number) => Math.abs(n) <= tolerance : tolerance

  let gap = 0
  let current = params[varIndex] as number

  for (let i = 0; i < maxIterations; i++) {
    const r1 = call(current)
    const x1 = r1 - goal

    if (matches(x1)) return current

    const r2 = call(current + x1)
    const x2 = r2 - goal

    if (results.includes(r1)) gap += 0.1
    else results.push(r1)

    let delta = (x2 - x1) / x1
    if (delta === 0) delta = 0.0001
    delta += gap

    current = current - x1 / delta
  }

  throw new Error('failed to converge')

  function call(value: number) {
    params[varIndex] = value
    const result = fnc(...params)

    if (!isNumber(result)) throw new TypeError('resulted in NaN')

    return result
  }
}
