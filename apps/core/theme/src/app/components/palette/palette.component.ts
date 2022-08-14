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
import { ColorMode, ConfigColorToken } from '../../utils/theme-generator'
import { HslControlComponent } from '../hsl-control/hsl-control.component'
import { PaletteChartComponent } from '../palette-chart/palette-chart.component'
import { SwatchComponent } from '../swatch/swatch.component'

@Component({
  selector: 'core-theme-palette',
  standalone: true,
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, SwatchComponent, PaletteChartComponent, HslControlComponent],
})
export class PaletteComponent implements OnChanges {
  @Input()
  palette!: Palette

  @Input()
  config!: ConfigColorToken

  @Output()
  configChange = new EventEmitter<ConfigColorToken>()

  colorModes = Object.values(ColorMode)
  showLightness = false
  showControls = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.config = { ...this.config }
    }
  }

  getShadeIndexKey(_: number, { name }: { name: string }) {
    return name
  }

  change<K extends keyof ConfigColorToken>(property: K, value: ConfigColorToken[K]): void {
    this.config[property] = value
    this.emitChange()
  }

  emitChange() {
    this.configChange.emit(this.config)
  }
}
