import { FileHandlerOptions } from './file-handler-options'

export interface CreatePreviewOptions extends FileHandlerOptions {
  size: number
  format?: 'avif' | 'webp' | 'png' | 'jpg'
}
