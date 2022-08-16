import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common'
import { Request, Response } from 'express'
import { map, Observable } from 'rxjs'
import { FileHandler } from '../classes/file-handler'

@Injectable()
export class FileStreamInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((fileHandler) => {
        if (!(fileHandler instanceof FileHandler)) return fileHandler

        const request = context.switchToHttp().getRequest<Request<unknown, unknown, unknown, { download?: boolean }>>()
        const response = context.switchToHttp().getResponse<Response>()
        const contentType = this.getContentType({
          mediaType: fileHandler.type,
          charset: fileHandler.charset,
        })
        const contentDisposition = this.getContentDisposition(Boolean(request.query.download), {
          filename: fileHandler.filename,
        })
        const contentLength = fileHandler.size

        response.setHeader('Content-Type', contentType)
        response.setHeader('Content-Length', contentLength)
        response.setHeader('Content-Disposition', contentDisposition)

        return new StreamableFile(fileHandler.stream)
      }),
    )
  }

  private getContentType(directives: { mediaType: string; charset?: string }) {
    const header: string[] = []

    header.push(directives.mediaType)

    if (directives.charset) {
      header.push(`charset=${directives.charset}`)
    }

    return header.join('; ')
  }

  private getContentDisposition(download: boolean, directives: { filename?: string } = {}) {
    const header: string[] = []

    header.push(download ? 'attachment' : 'inline')

    if (directives.filename) {
      const filename = encodeURIComponent(directives.filename)

      if (filename === directives.filename) {
        header.push(`filename="${filename}"`)
      } else {
        header.push(`filename*=UTF-8''${filename}`)
      }
    }

    return header.join('; ')
  }
}
