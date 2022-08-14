import chroma from 'chroma-js'
import { getForegroundColor, kebabCase, randomColor } from '@decet/core-shared'
import { Palette } from '../interfaces/palette'
import { getColorName } from './color-name'
import { ColorScheme } from './style-dictionary'

export type Color = chroma.Color
export type ColorType = chroma.Color | string

export enum ColorMode {
  RGB = 'rgb',
  HSL = 'hsl',
  HSV = 'hsv',
  HSI = 'hsi',
  LAB = 'lab',
  LCH = 'lch',
  HCL = 'hcl',
  LRGB = 'lrgb',
}

export interface Config {
  scheme: ColorScheme
  color: ConfigColor
}

export interface ConfigColor {
  steps: number
  correctLightness: boolean
  bezier: boolean
  mode: ColorMode
  tokens: ConfigColorToken[]
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface HSLTransform extends HSL {
  relative: boolean
}

export interface ConfigColorToken {
  name: string
  prefix: string
  label: string
  base: string
  correctLightness: boolean
  bezier: boolean
  mode: ColorMode
  min: HSL
  max: HSL
}

export function createTheme({ steps, tokens }: ConfigColor): Palette[] {
  return tokens.map(({ name, label, base, ...options }) => createColorPalette(name, label, base, { ...options, steps }))
}

export function createColorPalette(
  name: string,
  label: string,
  value: string,
  config: {
    steps: number
    min: HSL
    max: HSL
    mode: ColorMode
    correctLightness: boolean
    bezier: boolean
  },
): Palette {
  const color = chroma(value)
  const base = color.hex()
  const shadeColors = createShades(
    color,
    config.steps,
    config.min,
    config.max,
    config.mode,
    config.correctLightness,
    config.bezier,
  )
  const shades = shadeColors.map((value, i) => ({
    name: shadeName(i),
    background: value.hex(),
    foreground: getForegroundColor(value),
  }))

  return { name, label, base, shades }
}

function createShades(
  value: ColorType,
  steps: number,
  min: HSL,
  max: HSL,
  mode: ColorMode,
  correctLightness: boolean,
  bezier: boolean,
): Color[] {
  const color = chroma(value)
  const hsl = color.hsl()
  const relative = true
  const start = chroma(transformValues(min, relative ? hsl : [0, 0.5, 0.5]), 'hsl')
  const end = chroma(transformValues(max, relative ? hsl : [0, 0.5, 0.5]), 'hsl')

  let scale = bezier ? chroma.bezier([start.hex(), end.hex()]).scale() : chroma.scale([start, end]).mode(mode)

  if (correctLightness) scale = scale.correctLightness()

  return scale.colors(steps, null)
}

function transformValues(scale: HSL, hsl: number[]) {
  // const s = scale.s //scaleBetween(scale.s, -1, 1)
  // const l = scale.l //scaleBetween(scale.l, -1, 1)
  const value = [
    // hsl[0], // scaleBetween(scale.h, 0, hsl[0], 0, 360),
    hsl[0] + scale.h,
    hsl[1] + scale.s * (scale.s > 0 ? 1 - hsl[1] : hsl[1]),
    hsl[2] + scale.l * (scale.l > 0 ? 1 - hsl[2] : hsl[2]),
  ]
  // console.log({
  //   scale: { s, l },
  //   hsl,
  //   value,
  // })
  return value
}

// const scaleValue = scaleBetween(0.001, 0.999, -1, 1)
// const scaleRelativeValue = scaleBetween(-0.999, 0.999, -1, 1)
// function scaleValues(transform: HSLTransform): number[] {
//   return [transform.h / 360, (transform.s + 1) / 2, transform.l + 1 / 2]
// }

// export function scaleBetween(value: number, minAllowed: number, maxAllowed: number, min: number, max: number) {
//   return ((maxAllowed - minAllowed) * (value - min)) / (max - min) + minAllowed
// }

// function scaleBetween(value: number, min: number, max: number) {
//   return (value - min) / (max - min)
// }

// function transformvalues(values: [number, number, number], scales: [number, number, number], domain:[number, number],relative: boolean) {
//   const size = 1/domain[1] - domain[0]

//   return values.map((value, index) => {
//     // const scale = relative ? (scales[index]/2)
//     return value * index
//   })
// }

function shadeName(index: number): string {
  return String((index + 1) * 100)
}

export function createRandomPalette(): ConfigColorToken {
  const base = randomColor({ s: [0.5, 1], l: [0.25, 0.75] })
  const name = getColorName(base)?.name ?? 'unknown'
  const prefix = kebabCase(name)
  const label = prefix

  return {
    name,
    prefix,
    label,
    base,
    mode: ColorMode.RGB,
    correctLightness: true,
    bezier: true,
    min: DEFAULT_COLOR_CONTROL_CONFIG,
    max: DEFAULT_COLOR_CONTROL_CONFIG,
  }
}

export const DEFAULT_COLOR_CONTROL_CONFIG = { h: 0, s: 0, l: 0, relative: true }

export const DEFAULT_CONFIG: Config = {
  scheme: ColorScheme.DARK,
  color: {
    steps: 9,
    mode: ColorMode.RGB,
    correctLightness: true,
    bezier: true,
    tokens: [createRandomPalette(), createRandomPalette(), createRandomPalette()],
  },
}
