import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('close', () => {
      const { ip, method, url } = request
      const { statusCode } = response
      const contentLength = response.get('content-length') ?? '0'

      this.logger.log(`${method} ${url} ${ip} > ${statusCode} (${contentLength} bytes)`)
    })

    next()
  }
}
