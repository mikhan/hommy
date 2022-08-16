import { createHash } from 'crypto'
import { ReadStream, WriteStream } from 'fs'
import { join } from 'path'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { monotonicFactory } from 'ulid'
import { FilesystemService, FileReadSource } from '../../filesystem/services/filesystem.service'
import { TempFilesystemService } from '../../filesystem/services/temp-filesystem.service'
import { parsePath, getExt } from '../../filesystem/utils/path'
import { StorageFileHandler } from '../classes/storage-file-handler'
import { StorageFileHandlerOptions } from '../interfaces/storage-file-handler-options'
import { FileModel } from '../models/file.model'

const ulid = monotonicFactory()

export abstract class StorageService {
  public abstract bucket: string
  public abstract filesystemService: FilesystemService
  public abstract tempFilesystemService: TempFilesystemService
  public abstract httpService: HttpService

  public async get({ id, workspaceId }: { id: string; workspaceId: number }): Promise<StorageFileHandler | null> {
    const file = await FileModel.findByPk(id, {
      attributes: ['id', 'workspaceId', 'name', 'bucket', 'ext'],
    })

    if (!file) return null

    const path = await this.getPath(workspaceId, file.localFilename)

    return new StorageFileHandler(path, file)
  }

  public async getSome({
    id,
    workspaceId,
  }: {
    id: string[]
    workspaceId: number
  }): Promise<StorageFileHandler[] | null> {
    const files = await FileModel.findAll({
      where: { id },
      attributes: ['id', 'workspaceId', 'name', 'bucket', 'ext'],
    })

    if (!files.length) return null

    const storageFileHandler = []

    for (const file of files) {
      const path = await this.getPath(workspaceId, file.localFilename)
      storageFileHandler.push(new StorageFileHandler(path, file))
    }

    return storageFileHandler
  }

  public async save(
    { filename, workspaceId }: { filename: string; workspaceId: number },
    data: FileReadSource | URL,
  ): Promise<StorageFileHandler> {
    return this.tempFilesystemService.useTmpDir(async (tmpDir) => {
      const bucket = this.bucket
      const id = ulid()
      const tmpFile = join(tmpDir, id)
      const { name, ext, content } = await this.getReadable(filename, data)
      const readStream = await this.filesystemService.createReadStream(content)
      const writeStream = await this.filesystemService.createWriteStream(tmpFile)
      const { size, hash } = await this.write(writeStream, readStream)

      await FileModel.create({ id, workspaceId, name, bucket, ext, size, hash })

      const path = await this.getPath(workspaceId, id + ext)

      await this.filesystemService.moveFile(tmpFile, path)

      return this.getFileHandler(path, { id, workspaceId, name, bucket })
    })
  }

  public async delete(id: string) {
    const path = ''

    FileModel.destroy({ where: { id } })
    this.filesystemService.deleteFile(path)
  }

  public async getPath(workspaceId: number, filename: string) {
    return join(this.filesystemService.root, String(workspaceId), filename)
  }

  public async getFileHandler(path: string, options: StorageFileHandlerOptions): Promise<StorageFileHandler> {
    return new StorageFileHandler(path, options)
  }

  private async getReadable(
    filename: string,
    data: FileReadSource | URL,
  ): Promise<{ name: string; ext: string; content: FileReadSource }> {
    if (!(data instanceof URL)) {
      const { name, ext } = parsePath(filename)

      return { name, ext, content: data }
    }

    const url = data.toString()
    const response = await lastValueFrom(this.httpService.get<ReadStream>(url, { responseType: 'stream' }))
    const content = response.data
    const parts = parsePath(filename)

    if (parts.ext === '') {
      const headers: Record<string, string> = response.headers
      const headerName = Object.keys(headers).find((h) => h.toLowerCase() === 'content-type')
      const type = headerName && headers[headerName]

      parts.ext = getExt(type ?? '')
    }

    return { name: parts.name, ext: parts.ext, content }
  }

  private async write(writeStream: WriteStream, readStream: ReadStream): Promise<{ size: number; hash: string }> {
    return await new Promise((resolve, reject) => {
      const hash = createHash('sha256')
      writeStream.on('error', (error) => reject(error))
      writeStream.on('finish', () => resolve({ size: writeStream.bytesWritten, hash: hash.digest('hex') }))

      readStream.on('data', (chunk) => hash.update(chunk))
      readStream.pipe(writeStream)
    })
  }

  /**
   *
   * @deprecated
   */
  public async download({
    url,
    workspaceId,
    filename,
  }: {
    url: string
    workspaceId: number
    filename: string
  }): Promise<StorageFileHandler> {
    return this.save({ filename, workspaceId }, new URL(url))
  }
}
