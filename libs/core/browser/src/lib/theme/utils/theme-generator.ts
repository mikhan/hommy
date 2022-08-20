import chroma from 'chroma-js'
import { getForegroundColor, kebabCase, randomColor, RandomColorConfig } from '@decet/kendu-common'
import { Palette } from '../interfaces/palette'
import { ColorScheme } from '../interfaces/style-dictionary'
import { getColorName } from './color-name'

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

export function createTheme(config: Config) {
  return {
    scheme: config.scheme,
    color: createColors(config.color),
  }
}

function createColors({ steps, tokens }: ConfigColor): Palette[] {
  return tokens.map(({ name, label, base, ...options }) => createColorPalette(name, label, base, { ...options, steps }))
}

function createColorPalette(
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
  const shades = shadeColors.map((value, i) => {
    const data = {
      name: shadeName(i),
      background: value.toUpperCase(),
      foreground: getForegroundColor(value).toUpperCase(),
    }

    if (data.background === '#583B7D') {
      console.log(data.background, data.foreground)
    }

    return data
  })

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
): string[] {
  const color = chroma(value)
  const hsl = color.hsl()
  const relative = true
  const start = chroma(transformValues(min, relative ? hsl : [0, 0.5, 0.5]), 'hsl')
  const end = chroma(transformValues(max, relative ? hsl : [0, 0.5, 0.5]), 'hsl')

  let scale = bezier ? chroma.bezier([start.hex(), end.hex()]).scale() : chroma.scale([start, end]).mode(mode)

  if (correctLightness) scale = scale.correctLightness()

  return scale.colors(steps, null).map((color) => color.hex())
}

function transformValues(scale: HSL, hsl: number[]) {
  const value = [
    hsl[0] + scale.h,
    hsl[1] + scale.s * (scale.s > 0 ? 1 - hsl[1] : hsl[1]),
    hsl[2] + scale.l * (scale.l > 0 ? 1 - hsl[2] : hsl[2]),
  ]
  return value
}

function shadeName(index: number): string {
  return String((index + 1) * 100)
}

export function createRandomPalette({ h, s = [0.5, 1], l = [0.25, 0.75] }: RandomColorConfig = {}): ConfigColorToken {
  const base = randomColor({ h, s, l })
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
    min: { h: 0, s: 0, l: 0 },
    max: { h: 0, s: 0, l: 0 },
  }
}

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
