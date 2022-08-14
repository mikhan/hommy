import {
  asyncScheduler,
  distinctUntilKeyChanged,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  throttleTime,
} from 'rxjs'
import { Theme } from '../../utils/style-dictionary'
import { Config, createTheme } from '../../utils/theme-generator'

export class ThemeDataSource {
  private config = new ReplaySubject<Config>(1)

  dictionary$: Observable<Theme> = this.config.pipe(
    map((config) => ({ hash: this.getColorConfigTokenHash(config), config })),
    distinctUntilKeyChanged('hash'),
    throttleTime(100, asyncScheduler, { leading: false, trailing: true }),
    map(({ config }) => ({
      scheme: config.scheme,
      color: createTheme(config.color),
    })),
    shareReplay(1),
  )

  constructor(initialConfig?: Config) {
    if (initialConfig) {
      this.setConfig(initialConfig)
    }
  }

  setConfig(config: Config) {
    this.config.next(config)
  }

  getColorConfigTokenHash({ scheme, color }: Config): string {
    return [
      scheme,
      color.steps,
      color.tokens.map(({ mode, correctLightness, bezier, base, min, max }) => [
        mode,
        correctLightness,
        bezier,
        base,
        ...Object.values(min),
        ...Object.values(max),
      ]),
    ]
      .flat(Infinity)
      .join('')
  }
}
