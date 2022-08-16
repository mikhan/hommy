import { isString } from '@decet/kendu-common'

export function getInitialColorMode() {
  const persistedColorPreference = getApplicationColorMode('color-mode')

  if (isColorMode(persistedColorPreference)) return persistedColorPreference

  return getSystemColorMode()
}

export function getApplicationColorMode(key: string) {
  return window.localStorage.getItem(key)
}

export function getSystemColorMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches === true ? 'dark' : 'light'
}

export function isColorMode(value: unknown): value is 'light' | 'dark' {
  return isString(value) && (value === 'light' || value === 'dark')
}
