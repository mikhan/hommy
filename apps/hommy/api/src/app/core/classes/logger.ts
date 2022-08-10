import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common'
import * as winston from 'winston'

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
)

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: fileFormat,
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'combined.log',
    }),
  ],
})

export class AppLogger extends ConsoleLogger {
  constructor(context = '', options: ConsoleLoggerOptions = {}) {
    super(context, options)
  }

  error(message: string, context = this.context) {
    winstonLogger.error({ level: 'error', message, context })
    super.error(message, context)
  }

  warn(message: string, context = this.context) {
    winstonLogger.warn({ level: 'warn', message, context })
    super.warn(message, context)
  }

  log(message: string, context = this.context) {
    winstonLogger.log({ level: 'info', message, context })
    super.log(message, context)
  }

  verbose(message: string, context = this.context) {
    winstonLogger.log({ level: 'verbose', message, context })
    super.verbose(message, context)
  }

  debug(message: string, context = this.context) {
    winstonLogger.log({ level: 'debug', message, context })
    super.debug(message, context)
  }
}
