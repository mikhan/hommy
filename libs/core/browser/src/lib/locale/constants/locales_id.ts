import { InjectionToken } from '@angular/core'
import { LocaleId } from '../interface/locale-id'

export const LOCALE_IDS = new InjectionToken<LocaleId[]>('Locale IDs', { factory: () => [] })
