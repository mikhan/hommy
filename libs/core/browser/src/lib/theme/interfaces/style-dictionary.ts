import { Palette } from './palette'

export enum ColorScheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface Theme {
  scheme: ColorScheme
  color: Palette[]
  // color: ColorDictionary
}

export interface ColorDictionary {
  [name: string]: Palette
}
