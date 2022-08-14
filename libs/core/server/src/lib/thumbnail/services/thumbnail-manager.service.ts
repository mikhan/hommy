import { join, relative } from 'path'
import { Inject, Injectable } from '@nestjs/common'
import { FilesystemService } from '../../filesystem/services/filesystem.service'
import { parsePath, ParsePathResult } from '../../filesystem/utils/path'
import { ImageTransform } from '../classes/image-transform'
import { THUMBNAIL_MODULE_CONFIG } from '../constants/thumbnail_module_config'
import { Breakpoint } from '../interfaces/breakpoint'
import { ImageTransformOptions, TransformFormat, TransformResize } from '../interfaces/image-transform-options'
import { ThumbnailInfo } from '../interfaces/thumbnail-info'
import { ThumbnailModuleOptions } from '../interfaces/thumbnail-module-options'

@Injectable()
export class ThumbnailManagerService {
  public readonly root: string

  public readonly breakpoints: ReadonlyArray<Breakpoint>

  constructor(@Inject(THUMBNAIL_MODULE_CONFIG) options: ThumbnailModuleOptions, private fileSystem: FilesystemService) {
    this.root = options.root
    this.breakpoints = options.breakpoints
  }

  public async getPreview(sourcePath: string, options: ImageTransformOptions): Promise<ThumbnailInfo> {
    if (!options.resize && !options.format) return parsePath(sourcePath)

    const preview = this.getPreviewPath(sourcePath, options)

    if (await this.fileSystem.exists(preview.path)) return preview

    const transform = new ImageTransform(sourcePath)
    if (options.resize) transform.resize(options.resize)
    if (options.format) transform.format(options.format)

    await this.fileSystem.createDir(preview.dir)

    const { width, height, format } = await transform.save(preview.path)

    return { ...preview, info: { width, height, format } }
  }

  private getPreviewPath(path: string, transform: ImageTransformOptions): ParsePathResult {
    const parsed = parsePath(path)

    if (transform.resize) {
      parsed.name += '.' + Math.round(transform.resize.width) + (transform.resize.type === 'square' ? '-square' : '')
    }

    if (transform.format) {
      parsed.ext = '.' + transform.format.type
    }

    parsed.dir = join(this.root, relative(this.fileSystem.root, parsed.dir))

    return { ...parsed, path: join(parsed.dir, parsed.name + parsed.ext) }
  }

  public isValidFormat(value?: string): value is TransformFormat['type'] {
    return !!value && /avif|webp|png|jpe?g/.test(value)
  }

  public isValidResizeType(value?: string): value is TransformResize['type'] {
    return !!value && /square|scale/.test(value)
  }

  public getClosestBreakpoint(width: number): Breakpoint {
    const breakpoints = [...this.breakpoints]

    let breakpoint = breakpoints.shift() as Breakpoint

    for (const current of breakpoints) {
      if (width > current.width) {
        breakpoint = current
        continue
      }

      if (width - breakpoint.width > current.width - width) {
        breakpoint = current
      }

      break
    }

    return breakpoint
  }
}
