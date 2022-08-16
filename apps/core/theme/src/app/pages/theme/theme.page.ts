import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { ContentComponentModule } from '@decet/kendu-browser'
import { HslControlComponent } from '../../components/hsl-control/hsl-control.component'
import { PaletteChartComponent } from '../../components/palette-chart/palette-chart.component'
import { PaletteComponent } from '../../components/palette/palette.component'
import { SwatchComponent } from '../../components/swatch/swatch.component'
import { Config, DEFAULT_CONFIG, ConfigColorToken, createRandomPalette } from '../../utils/theme-generator'
import { ThemeDataSource } from './theme-datasource'

export function validateEnum(object: Record<string, unknown>): ValidatorFn {
  return function (control: AbstractControl) {
    if (control.value in object) return null

    return { enum: `${control.value} is not a valid value.` }
  }
}

export function validateBetween(min: number, max: number): ValidatorFn {
  return function ({ value }: AbstractControl) {
    if (typeof value === 'number' && value >= min && value <= max) return null

    return { between: `${value} must be a number between ${min} and ${max}.` }
  }
}

function setConfig(config: Config): void {
  localStorage.setItem('theme.config', JSON.stringify(config))
}

function getConfig(): Config {
  const value = localStorage.getItem('theme.config')

  return value ? JSON.parse(value) : DEFAULT_CONFIG
}

@Component({
  standalone: true,
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ContentComponentModule,
    FontAwesomeModule,
    SwatchComponent,
    PaletteChartComponent,
    HslControlComponent,
    PaletteComponent,
  ],
})
export class ThemePage {
  config = getConfig()

  private dataSource = new ThemeDataSource(this.config)

  dictionary$ = this.dataSource.dictionary$ //.pipe(map((theme) => createDictionary(theme)))

  icons = {
    config: faCog,
  }

  getTokenIndexKey(index: number) {
    return index
  }

  addColorPalette() {
    this.config.color.tokens.push(createRandomPalette())
    console.log(this.config)
    this.render()
  }

  updateColorPalette(palette: ConfigColorToken, newPalette: ConfigColorToken) {
    const index = this.config.color.tokens.indexOf(palette)
    this.config.color.tokens.splice(index, 1, newPalette)
    this.render()
  }

  removeColorPalette(palette: ConfigColorToken) {
    const index = this.config.color.tokens.indexOf(palette)
    this.config.color.tokens.splice(index, 1)
    this.render()
  }

  render() {
    this.dataSource.setConfig(this.config)
    setConfig(this.config)
  }
}
