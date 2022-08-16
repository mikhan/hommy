import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import chroma from 'chroma-js'
import {
  ColorReadabilityStatics,
  ColorType,
  fadeColor,
  getColorContrast,
  getColorReadability,
  round,
} from '@decet/kendu-common'
import { getColorName } from '../../utils/color-name'

const DEFAULT_NAME = 'Monotone'
const DEFAULT_BACKGROUND = '#FFFFFF'
const DEFAULT_FOREGROUND = '#000000'
const DEFAULT_INFO = getColorInfo(DEFAULT_BACKGROUND, DEFAULT_FOREGROUND)

@Component({
  standalone: true,
  selector: 'core-theme-swatch',
  templateUrl: './swatch.component.html',
  styleUrls: ['./swatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
})
export class SwatchComponent implements OnChanges {
  @Input()
  name = DEFAULT_NAME

  @Input()
  background = DEFAULT_BACKGROUND

  @Input()
  foreground = DEFAULT_FOREGROUND

  caption = DEFAULT_FOREGROUND

  info = DEFAULT_INFO

  icons = {
    valid: faCheck,
    invalid: faTimes,
  }

  isReadable = true

  levels = ['AA', 'AAA'] as const
  sizes = ['large', 'small'] as const
  readability = {
    large: {
      name: 'Large (24px)',
      style: { fontSize: '24px', fontWeight: 'normal', opacity: 1 },
    },
    small: {
      name: 'Small (16px)',
      style: { fontSize: '16px', fontWeight: 'normal', opacity: 1 },
    },
  }

  ngOnChanges(): void {
    this.recalculate()
  }

  // @Debounce(150)
  private recalculate(): void {
    this.caption = fadeColor(this.background, this.foreground, 0.6).hex().toUpperCase()
    this.info = getColorInfo(this.background, this.foreground)
    this.isReadable = this.info.readability.AAA.small.readable
  }
}

function getColorInfo(background: ColorType, foreground: ColorType): ColorInfo {
  background = chroma(background)
  foreground = chroma(foreground)

  const color = getColorFormats(background)
  const name = getColorName(background)?.name ?? ''
  const contrast = round(getColorContrast(background, foreground), 2)
  const readability = getColorReadability(background, foreground)

  return { name, color, contrast, readability }
}

function getColorFormats(value: chroma.Color): ColorFormats {
  const [r, g, b] = value.rgb()
  const [h, s, l] = value.hsl()

  return {
    hex: value.hex(),
    rgb: { r, g, b },
    hsl: { h, s, l },
  }
}

export interface ColorInfo {
  readonly name: string
  readonly contrast: number
  readonly color: ColorFormats
  readonly readability: ColorReadability
}

export interface ColorFormats {
  readonly hex: string
  readonly rgb: { r: number; g: number; b: number }
  readonly hsl: { h: number; s: number; l: number }
}

export interface ColorReadability {
  readonly AA: { small: ColorReadabilityStatics; large: ColorReadabilityStatics }
  readonly AAA: { small: ColorReadabilityStatics; large: ColorReadabilityStatics }
}
