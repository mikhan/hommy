export function random(min: number, max: number, decimals = 2): number {
  return Number((min + Math.random() * (max - min)).toFixed(decimals))
}

export function randomInt(min: number, max: number): number {
  return random(min, max, 0)
}
