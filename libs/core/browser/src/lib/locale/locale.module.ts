import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core'
import { LOCALE_IDS } from './constants/locales_id'
import { LocaleId } from './interface/locale-id'
import { loadExtraLocales } from './utils/load-locales'

@NgModule({})
export class CoreLocaleModule {
  public static forRoot(config: { localeIds: [LocaleId, ...LocaleId[]] }): ModuleWithProviders<CoreLocaleModule> {
    return {
      ngModule: CoreLocaleModule,
      providers: [
        { provide: LOCALE_ID, useValue: config.localeIds[0] },
        { provide: LOCALE_IDS, useValue: config.localeIds },
        {
          provide: APP_INITIALIZER,
          useFactory: loadExtraLocales,
          deps: [LOCALE_IDS],
          multi: true,
        },
      ],
    }
  }
}
