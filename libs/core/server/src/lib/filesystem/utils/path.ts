import { normalize, sep, join, parse } from 'path'
import { extension } from 'mime-types'

export type ParsePathResult = {
  path: string
  dir: string
  name: string
  ext: string
}

export function parsePath(path: string): ParsePathResult {
  //const match = path.match(/(?<dir>.*[\\/]|)(?<name>\..*?|.*?)(?<ext>\.[^.]*?|)$/)?.groups
  const { dir, name, ext } = parse(path)
  return { path, dir, name, ext }
}

export function getDir(path: string): string {
  return parsePath(path).dir
}

export function getExt(type: string): string {
  const ext = extension(type)
  return ext ? '.' + ext : ''
}

export function getCommonPath(path1: string, path2: string): string {
  const parts1 = normalize(path1).split(sep)
  const parts2 = normalize(path2).split(sep)
  const common = []

  for (let i = 0; i < parts1.length; i++) {
    if (parts1[i] !== parts2[i]) break
    common.push(parts1[1])
  }

  return join(...common)
}
