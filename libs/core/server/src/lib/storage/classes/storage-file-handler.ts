import { Define, Enumerable } from '@decet/core-shared'
import { FileHandler } from '../../filesystem/classes/file-handler'
import { StorageFileHandlerOptions } from '../interfaces/storage-file-handler-options'

@Define()
export class StorageFileHandler extends FileHandler {
  @Enumerable(false)
  readonly id: string

  @Enumerable(false)
  readonly workspaceId: number

  @Enumerable(false)
  readonly bucket: string

  constructor(source: string, options: StorageFileHandlerOptions) {
    super(source, options)
    this.id = options.id
    this.workspaceId = options.workspaceId
    this.bucket = options.bucket
  }
}
