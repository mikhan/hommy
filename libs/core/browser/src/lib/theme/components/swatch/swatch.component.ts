import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import chroma from 'chroma-js'
import { ColorReadabilityStatics, fadeColor, getColorContrast, getColorReadability, round } from '@decet/kendu-common'

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
  name = ''

  @Input()
  background!: string

  @Input()
  foreground!: string

  caption!: string

  @Input()
  showValues = false

  info!: ColorInfo

  icons = {
    valid: faCheck,
    invalid: faTimes,
  }

  hsl = { h: 0, s: 0, l: 0 }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] || changes['foreground']) {
      this.recalculate()
    }
  }

  private recalculate(): void {
    this.caption = fadeColor(this.background, this.foreground, 0.6).hex().toUpperCase()
    this.info = getColorInfo(this.background, this.foreground, this.caption)
    this.isReadable = this.info.readability.AAA.small.readable

    const [h, s, l] = chroma(this.background).hsl()

    this.hsl = {
      h: Math.round(Number.isNaN(h) ? 0 : h),
      s: Math.round((Number.isNaN(s) ? 0 : s) * 100),
      l: Math.round((Number.isNaN(l) ? 0 : l) * 100),
    }
  }
}

function getColorInfo(background: string, foreground: string, caption: string): ColorInfo {
  const contrast = round(getColorContrast(background, foreground), 2)
  const readability = getColorReadability(background, foreground)

  return { background, foreground, caption, contrast, readability }
}

export interface ColorInfo {
  readonly background: string
  readonly foreground: string
  readonly caption: string
  readonly contrast: number
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
