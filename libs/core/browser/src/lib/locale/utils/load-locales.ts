import { registerLocaleData } from '@angular/common'
import { LocaleId } from '../interface/locale-id'

export function loadExtraLocales(localeIds: LocaleId[]): () => Promise<void> {
  return async () => {
    for (const localeId of localeIds) {
      let localeData: unknown

      switch (localeId) {
        case 'es-MX':
          localeData = (await import('@angular/common/locales/es-MX')).default
          break
      }

      if (localeData) registerLocaleData(localeData)
    }
  }
}
