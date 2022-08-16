import { FileHandlerOptions } from './file-handler-options'

export interface ResponsiveImageHandlerOptions extends FileHandlerOptions {
  format: 'avif' | 'webp' | 'png' | 'jpg'
}
