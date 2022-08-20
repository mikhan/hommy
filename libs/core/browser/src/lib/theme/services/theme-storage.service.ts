import { Injectable } from '@angular/core'
import { LocalStorageService } from '@decet/kendu-browser'
import { Config } from '../utils/theme-generator'

@Injectable({ providedIn: 'root' })
export class ThemeStorageService extends LocalStorageService<Config> {
  protected namespace = 'app-theme'
}
