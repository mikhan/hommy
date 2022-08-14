import { Inject } from '@nestjs/common'

export const prefixesForStorages: { [k: string]: { bucket: string } } = {}

export function Storage(bucket: string) {
  const provide = `StorageService${bucket}`

  if (!(provide in prefixesForStorages)) {
    prefixesForStorages[provide] = { bucket }
  }

  return Inject(provide)
}
