import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { map, zip } from 'rxjs'
import { ContentComponentModule } from '@decet/kendu-browser'
import { HslControlComponent } from '../../components/hsl-control/hsl-control.component'
import { PaletteChartComponent } from '../../components/palette-chart/palette-chart.component'
import { PaletteComponent } from '../../components/palette/palette.component'
import { SwatchComponent } from '../../components/swatch/swatch.component'
import { ThemeDatasourceService } from '../../services/theme-datasource.service'
import { ConfigColorToken, createRandomPalette } from '../../utils/theme-generator'

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
  protected data$ = zip([this.datasource.config$, this.datasource.dictionary$]).pipe(
    map(([config, dictionary]) => ({ config, dictionary })),
  )

  protected icons = {
    config: faCog,
  }

  constructor(private datasource: ThemeDatasourceService) {}

  protected getTokenIndexKey(index: number): number {
    return index
  }

  protected async addColorPalette(): Promise<ConfigColorToken> {
    const palette = createRandomPalette()
    const config = await this.datasource.getConfig()
    config.color.tokens.push(palette)
    await this.datasource.setConfig(config)

    return palette
  }

  // protected async updateColorPalette(palette: ConfigColorToken, newPalette: ConfigColorToken) {
  //   const config = await this.dataSource.getConfig()
  //   console.log('updateColorPalette', { config })
  // }
  protected async updateColorPalette(palette: ConfigColorToken, newPalette: ConfigColorToken): Promise<void> {
    const config = await this.datasource.getConfig()
    const index = config.color.tokens.indexOf(palette)
    config.color.tokens.splice(index, 1, newPalette)
    await this.datasource.setConfig(config)
  }

  protected async removeColorPalette(palette: ConfigColorToken): Promise<void> {
    const config = await this.datasource.getConfig()
    const index = config.color.tokens.indexOf(palette)
    config.color.tokens.splice(index, 1)
    await this.datasource.setConfig(config)
  }
}
