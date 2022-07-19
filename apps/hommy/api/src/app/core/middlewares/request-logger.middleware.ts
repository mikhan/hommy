import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { HTTP_LOGGER } from '../constants/http-logger'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    response.on('close', () => {
      const { ip, method, url } = request
      const { statusCode } = response
      const contentLength = response.get('content-length') ?? '0'

      HTTP_LOGGER.log(
        `${method} ${url} ${ip} > ${statusCode} (${contentLength} bytes)`,
      )
    })

    next()
  }
}
