export function interpolate(value: number, lowerLimit: number, upperLimit: number): number {
  return lowerLimit + value * (upperLimit - lowerLimit)
}

export function round(value: number, precision = 0): number {
  return shift(Math.round(shift(value, +precision)), -precision)
}

export function shift(value: number, exponent: number): number {
  const [v1, v2] = ('' + value).split('e')

  return +(v1 + 'e' + (v2 ? +v2 + exponent : exponent))
}

export { clamp } from 'ramda'
