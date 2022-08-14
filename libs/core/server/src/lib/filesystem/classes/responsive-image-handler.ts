import { ResponsiveImageHandlerOptions } from '../interfaces/responsive-image-handler-options'
import { FileHandler } from './file-handler'

export class ResponsiveImageHandler extends FileHandler {
  constructor(target: string, options: ResponsiveImageHandlerOptions) {
    target = ''
    super(target, options)
  }
}
