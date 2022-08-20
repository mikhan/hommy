import { asyncScheduler, map, Observable, ReplaySubject, shareReplay, throttleTime, firstValueFrom } from 'rxjs'
import { LocalStorageService } from '@decet/kendu-browser'
import { Theme } from '../interfaces/style-dictionary'
import { Config, createTheme, DEFAULT_CONFIG } from '../utils/theme-generator'

export class ThemeDataSource {
  private configSubject = new ReplaySubject<Config>(1)

  readonly config$ = this.configSubject.asObservable()

  readonly dictionary$: Observable<Theme> = this.config$.pipe(
    // map((config) => ({ hash: this.getColorConfigTokenHash(config), config })),
    // distinctUntilKeyChanged('hash'),
    throttleTime(100, asyncScheduler, { leading: false, trailing: true }),
    // map(({ config }) => createTheme(config)),
    map((config) => createTheme(config)),
    shareReplay(1),
  )

  private storage = new LocalStorageService<Config>()

  constructor() {
    this.init()
  }

  private async init(): Promise<void> {
    const initialConfig = await this.recoverConfig()
    this.configSubject.next(initialConfig)
  }

  public async getConfig(): Promise<Config> {
    return firstValueFrom(this.config$)
  }

  public async setConfig(config: Config): Promise<void> {
    await this.saveConfig(config)
    this.configSubject.next(config)
  }

  private async saveConfig(config: Config): Promise<void> {
    console.log('saveConfig', config)
    await this.storage.set('theme.config', config)
  }

  private async recoverConfig(): Promise<Config> {
    return (await this.storage.get('theme.config')) ?? DEFAULT_CONFIG
  }

  // private getColorConfigTokenHash({ scheme, color }: Config): string {
  //   return [
  //     scheme,
  //     color.steps,
  //     color.tokens.map(({ mode, correctLightness, bezier, base, min, max }) => [
  //       mode,
  //       correctLightness,
  //       bezier,
  //       base,
  //       ...Object.values(min),
  //       ...Object.values(max),
  //     ]),
  //   ]
  //     .flat(Infinity)
  //     .join('')
  // }
}
