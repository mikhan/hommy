import { FileHandlerOptions } from '../../filesystem/interfaces/file-handler-options'

export interface StorageFileHandlerOptions extends FileHandlerOptions {
  id: string
  workspaceId: number
  name: string
  bucket: string
}
