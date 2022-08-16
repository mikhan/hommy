import chroma from 'chroma-js'
import { ColorType, getColorContrast, isLight } from '../../common/utilities/color'
import { clamp } from '../../common/utilities/number'

export enum ReadabilityLevel {
  AA = 'AA',
  AAA = 'AAA',
}

export enum ReadabilitySize {
  SMALL = 'small',
  LARGE = 'large',
}

export interface ColorReadabilityOptions {
  level: ReadabilityLevel
  size: ReadabilitySize
}

export interface ColorReadabilityStatics extends ColorReadabilityOptions {
  required: number
  contrast: number
  readable: boolean
}

const COLOR_READABILITY_DEFAULT_OPTIONS: ColorReadabilityOptions = {
  level: ReadabilityLevel.AAA,
  size: ReadabilitySize.SMALL,
} as const

export function getForegroundColor(value: ColorType): string {
  const background = chroma(value)
  let foreground
  let luminance = background.luminance()
  const limit = isLight(background) ? 0 : 1
  const step = (limit - luminance) / 20

  do {
    luminance = luminance + step
    luminance = clamp(0, 1, luminance)
    foreground = background.luminance(luminance)
  } while (luminance > 0 && luminance < 1 && !isReadable(foreground, background))

  return foreground.hex()
}

function isReadable(color1: ColorType, color2: ColorType, options: Partial<ColorReadabilityOptions> = {}): boolean {
  return getReadabilityStatics(color1, color2, options).readable
}

function getReadabilityRequiredContrast(options: Partial<ColorReadabilityOptions> = {}): number {
  const { level, size } = getReadabilityOptions(options)
  if (level === 'AAA' && size === 'small') return 7
  else if (level === 'AA' && size === 'large') return 3
  else return 4.5
}

function getReadabilityOptions({ level, size }: Partial<ColorReadabilityOptions> = {}): ColorReadabilityOptions {
  if (level && level !== 'AA' && level !== 'AAA') throw new Error('Invalid readability option level.')
  if (size && size !== 'small' && size !== 'large') throw new Error('Invalid readability option size.')

  level ??= COLOR_READABILITY_DEFAULT_OPTIONS.level
  size ??= COLOR_READABILITY_DEFAULT_OPTIONS.size

  return { level, size }
}

// function getMostReadable(
//   base: ColorType,
//   colors: ColorType[],
//   options: Partial<ColorReadabilityOptions> = {},
// ): ColorType {
//   let bestColor = null
//   let bestContrast = 0

//   colors = colors.concat(['#fff', '#000'])
//   for (const testColor of colors) {
//     const colorContrast = getColorContrast(base, testColor)

//     if (colorContrast > bestContrast) {
//       bestContrast = colorContrast
//       bestColor = testColor
//     }
//   }

//   if (!bestColor || !isReadable(base, bestColor, options)) {
//     bestColor = isLight(base) ? '#000' : '#fff'
//   }

//   return bestColor
// }

function getReadabilityStatics(
  color1: ColorType,
  color2: ColorType,
  options: Partial<ColorReadabilityOptions> = {},
): ColorReadabilityStatics {
  const { level, size } = getReadabilityOptions(options)
  const required = getReadabilityRequiredContrast({ level, size })
  const contrast = getColorContrast(color1, color2)
  const readable = contrast >= required

  return { required, contrast, readable, level, size }
}

export function getColorReadability(background: ColorType, foreground: ColorType) {
  return {
    AA: {
      small: getReadabilityStatics(background, foreground, {
        level: ReadabilityLevel.AA,
        size: ReadabilitySize.SMALL,
      }),
      large: getReadabilityStatics(background, foreground, {
        level: ReadabilityLevel.AA,
        size: ReadabilitySize.LARGE,
      }),
    },
    AAA: {
      small: getReadabilityStatics(background, foreground, {
        level: ReadabilityLevel.AAA,
        size: ReadabilitySize.SMALL,
      }),
      large: getReadabilityStatics(background, foreground, {
        level: ReadabilityLevel.AAA,
        size: ReadabilitySize.LARGE,
      }),
    },
  }
}
