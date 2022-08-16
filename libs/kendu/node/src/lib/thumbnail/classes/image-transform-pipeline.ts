import sharp, { Sharp } from 'sharp'
import { TransformFormat, TransformResize } from '../interfaces/image-transform-options'

export class ImageTransformPipeline {
  protected sharp: Sharp = sharp()

  constructor(source?: string | Buffer) {
    this.createInstannce(source)
  }

  protected createInstannce(source?: string | Buffer): void {
    this.sharp = sharp(source)
  }

  public format({ type, options }: TransformFormat): void {
    switch (type) {
      case 'avif':
        this.sharp.toFormat('avif', options)
        break

      case 'webp':
        this.sharp.toFormat('webp', options)
        break

      case 'png':
        this.sharp.toFormat('png', options)
        break

      case 'jpg':
      case 'jpeg':
        this.sharp.toFormat('jpeg', { mozjpeg: true, ...options })
        break

      default:
        throw new TypeError(`Invalid preview format ${type}`)
    }
  }

  public resize({ type, width }: TransformResize): void {
    switch (type) {
      case 'square':
        this.sharp.resize({ width, height: width })
        break

      case 'scale':
        this.sharp.resize({ width })
        break

      default:
        throw new TypeError(`Invalid resize type ${type}`)
    }
  }
}
