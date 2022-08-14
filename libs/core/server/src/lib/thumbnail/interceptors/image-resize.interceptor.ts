import { CallHandler, ExecutionContext, Inject, mixin, NestInterceptor, Type } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Request } from 'express'
import { from, Observable, switchMap } from 'rxjs'
import { FileHandler } from '../../filesystem/classes/file-handler'
import { isImage } from '../../filesystem/utils/file'
import { HttpResizeQuery } from '../interfaces/http-resize-query'
import { ImageTransformOptions } from '../interfaces/image-transform-options'
import { ThumbnailManagerService } from '../services/thumbnail-manager.service'

export function ImageResizeInterceptor(): Type<NestInterceptor> {
  class MixinInterceptor {
    constructor(
      @Inject(ThumbnailManagerService)
      private imagePreview: ThumbnailManagerService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
      return next.handle().pipe(
        switchMap((fileHandler) => {
          if (!(fileHandler instanceof FileHandler) || !isImage(fileHandler.type)) {
            return from(fileHandler)
          }

          return from(this.generatePreview(context.switchToHttp(), fileHandler))
        }),
      )
    }

    private async generatePreview(httpContext: HttpArgumentsHost, handler: FileHandler): Promise<FileHandler> {
      const request = httpContext.getRequest<Request<unknown, unknown, unknown, HttpResizeQuery>>()
      const requestSize = request.query.size && parseInt(request.query.size, 10)
      const requestFormat = request.query.format

      const options: Partial<ImageTransformOptions> = {}

      if (requestSize) {
        options.resize = { type: 'scale', width: requestSize }
      }

      if (requestFormat && this.imagePreview.isValidFormat(requestFormat)) {
        options.format = { type: requestFormat }
      }

      if (!requestSize) return handler
      if (typeof requestFormat !== 'undefined' && !this.imagePreview.isValidFormat(requestFormat)) return handler

      if (!requestFormat) return handler
      if (!this.imagePreview.isValidFormat(requestFormat)) return handler

      const preview = await this.imagePreview.getPreview(handler.source, {
        resize: { type: 'scale', width: requestSize },
        format: requestFormat && { type: requestFormat },
      })

      return new FileHandler(preview.path, { name: handler.name })
    }
  }

  return mixin(MixinInterceptor)
}
