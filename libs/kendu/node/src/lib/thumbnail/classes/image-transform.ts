import { OutputInfo } from 'sharp'
import { ImageTransformPipeline } from './image-transform-pipeline'

export class ImageTransform extends ImageTransformPipeline {
  constructor(source: string | Buffer) {
    super(source)
  }

  public save(path: string): Promise<OutputInfo> {
    return this.sharp.toFile(path)
  }

  public getBuffer(): Promise<{ info: OutputInfo; data: Buffer }> {
    return this.sharp.toBuffer({ resolveWithObject: true })
  }
}
