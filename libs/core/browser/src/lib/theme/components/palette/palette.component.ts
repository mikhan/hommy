import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Palette } from '../../interfaces/palette'
import { ColorMode, ConfigColorToken, HSL } from '../../utils/theme-generator'
import { ColorControlComponent } from '../color-control/color-control.component'
import { HslControlComponent } from '../hsl-control/hsl-control.component'
import { PaletteChartComponent } from '../palette-chart/palette-chart.component'
import { SwatchComponent } from '../swatch/swatch.component'

@Component({
  standalone: true,
  selector: 'core-theme-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    SwatchComponent,
    PaletteChartComponent,
    HslControlComponent,
    ColorControlComponent,
  ],
})
export class PaletteComponent implements OnChanges {
  @Input()
  palette!: Palette

  @Input()
  config!: ConfigColorToken

  @Output()
  configChange = new EventEmitter<ConfigColorToken>()

  colorModes = Object.values(ColorMode)
  showControls = false

  get label(): string {
    return this.config.label
  }

  set label(value: string) {
    this.config.label = value
    this.emit()
  }

  get mode(): ColorMode {
    return this.config.mode
  }

  set mode(value: ColorMode) {
    this.config.mode = value
    this.emit()
  }

  get correctLightness(): boolean {
    return this.config.correctLightness
  }

  set correctLightness(value: boolean) {
    this.config.correctLightness = value
    this.emit()
  }

  get bezier(): boolean {
    return this.config.bezier
  }

  set bezier(value: boolean) {
    this.config.bezier = value
    this.emit()
  }

  get base(): string {
    return this.config.base
  }

  set base(value: string) {
    this.config.base = value
    this.emit()
  }

  get min(): HSL {
    return this.config.min
  }

  set min(value: HSL) {
    this.config.min = value
    this.emit()
  }

  get max(): HSL {
    return this.config.max
  }

  set max(value: HSL) {
    this.config.max = value
    this.emit()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.config = { ...this.config }
    }
  }

  getShadeIndexKey(_: number, { name }: { name: string }): string {
    return name
  }

  change<K extends keyof ConfigColorToken>(property: K, value: ConfigColorToken[K]): void {
    this.config[property] = value
    this.emit()
  }

  emit(): void {
    this.configChange.emit(this.config)
  }
}
