import chroma from 'chroma-js'
import { clamp } from 'ramda'
import { interpolate } from './number'

export type Color = chroma.Color

export type ColorType = chroma.Color | string

export function isLight(color: ColorType): boolean {
  return chroma(color).get('hsl.l') >= 0.5
}

export function isDark(color: ColorType): boolean {
  return !isLight(color)
}

export function getColorContrast(color1: ColorType, color2: ColorType): number {
  return chroma.contrast(color1, color2)
  // const lum1 = chroma(color1).luminance()
  // const lum2 = chroma(color2).luminance()
  // const min = Math.min(lum1, lum2) + 0.05
  // const max = Math.max(lum1, lum2) + 0.05

  // return max / min
}

export function fadeColor(color1: ColorType, color2: ColorType, opacity: number) {
  const c1 = chroma(color1).rgb()
  const c2 = chroma(color2).rgb()

  return chroma(c1.map((_, i) => Math.floor(clamp(0, c1[i] + (c2[i] - c1[i]) * opacity, 255))))
}

export type RandomColorConfig = { h?: [number, number]; s?: [number, number]; l?: [number, number] }

export function randomColor({ h, s, l }: RandomColorConfig = {}) {
  h ??= [0, 360]
  s ??= [0, 1]
  l ??= [0, 1]

  const hue = interpolate(Math.random(), h[0], h[1])
  const sat = interpolate(Math.random(), s[0], s[1])
  const lum = interpolate(Math.random(), l[0], l[1])
  const color = chroma(hue, sat, lum, 'hsl')

  return color.hex()
}
