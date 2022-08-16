import { constants, createReadStream, createWriteStream, ReadStream, WriteStream } from 'fs'
import { access, mkdir, realpath, rmdir, unlink, rename, writeFile } from 'fs/promises'
import { join } from 'path'
import { Inject, Injectable } from '@nestjs/common'
import { FileHandler } from '../classes/file-handler'
import { FILESYSTEM_MODULE_CONFIG } from '../contants/filesystem_module_config'
import { FileHandlerOptions } from '../interfaces/file-handler-options'
import { getDir } from '../utils/path'
import type { FilesystemModuleConfig } from '../interfaces/filesystem-module-config'

export type FileReadSource = ReadStream | Buffer | string

export type FileWriteSource = WriteStream | string

@Injectable()
export class FilesystemService {
  public readonly root: string

  constructor(@Inject(FILESYSTEM_MODULE_CONFIG) config: FilesystemModuleConfig) {
    this.root = config.root
  }

  public async createDir(path: string): Promise<void> {
    await mkdir(path, { recursive: true })
  }

  public async removeDir(path: string): Promise<void> {
    await rmdir(path, { recursive: true })
  }

  public async getFileHandler(path: string, options: FileHandlerOptions = {}): Promise<FileHandler> {
    return new FileHandler(path, options)
  }

  public async createFile(path: string, data: FileReadSource): Promise<void> {
    await writeFile(path, data, { encoding: 'utf-8' })
  }

  public async deleteFile(path: string): Promise<void> {
    await unlink(path)
  }

  public async moveFile(oldpath: string, newPath: string): Promise<void> {
    const dir = getDir(newPath)
    await this.createDir(dir)
    await rename(oldpath, newPath)
  }

  public async renameFile(path: string, newName: string): Promise<void> {
    const oldPath = await realpath(path)
    const newPath = join(getDir(oldPath), newName)
    await rename(oldPath, newPath)
  }

  public async createReadStream(source: FileReadSource): Promise<ReadStream> {
    if (source instanceof ReadStream) return source

    if (typeof source === 'string' || source instanceof Buffer) {
      return createReadStream(source)
    }

    throw new TypeError(`Data must be of type ReadStream, Buffer or a path string. Received ${typeof source}.`)
  }

  public async createWriteStream(source: FileWriteSource): Promise<WriteStream> {
    if (source instanceof WriteStream) return source

    if (typeof source === 'string') {
      return createWriteStream(source)
    }

    throw new TypeError(`Data must be of type WriteStream or a path string. Received ${typeof source}.`)
  }

  public async exists(path: string): Promise<boolean> {
    return this.access(path, constants.F_OK)
  }

  public async isReadable(path: string): Promise<boolean> {
    return this.access(path, constants.R_OK)
  }

  public async isWritable(path: string): Promise<boolean> {
    return this.access(path, constants.W_OK)
  }

  private async access(path: string, mode: number): Promise<boolean> {
    try {
      await access(path, mode)
      return true
    } catch {
      return false
    }
  }
}
