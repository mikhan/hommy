const m = 0x80000000 // 2**31
const a = 1103515245
const c = 12345

export interface PseudoRandomGeneratorOptions {
  seed?: number
  precision?: number
  min?: number
  max?: number
}

export class PseudoRandomGenerator {
  public readonly seed: number
  public readonly min: number
  public readonly max: number
  public readonly precision: number

  private diff: number
  private pow: number
  private state: number

  constructor({ seed, precision = 0, min = -Infinity, max = +Infinity }: PseudoRandomGeneratorOptions) {
    this.seed = seed ?? Math.floor(Math.random() * (m - 1))
    this.state = this.seed

    this.precision = precision
    this.pow = 10 ** this.precision

    this.min = Math.max(min, Number.MIN_SAFE_INTEGER / this.pow)
    this.max = Math.min(max, Number.MAX_SAFE_INTEGER / this.pow)
    this.diff = this.max - this.min
  }

  next() {
    this.state = (a * this.state + c) % m
    const value = this.state / (m - 1)

    return Math.round((this.min + value * this.diff) * this.pow) / this.pow
  }
}
