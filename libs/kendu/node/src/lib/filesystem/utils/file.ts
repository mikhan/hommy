import { statSync } from 'fs'
import { charset, lookup } from 'mime-types'

export function getSize(path: string): number {
  return statSync(path).size
}

export function getType(ext: string): string {
  return lookup(ext) || 'application/octet-stream'
}

export function getCharset(type: string): string {
  return charset(type) || ''
}

export function isImage(mime: string): boolean {
  return /image\/.+/i.test(mime)
}
