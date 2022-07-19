import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common'
import * as winston from 'winston'

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
)

const consoleFormat = winston.format.combine(
  winston.format.ms(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ level: false, message: true }),
  winston.format.printf(function ({ level, message, context, timestamp, ms }) {
    level = level.padStart(7, ' ').toUpperCase()

    return `${timestamp} ${level} [${context}] ${message} ${ms}`
  }),
)

const winstonLogger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat,
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
      format: fileFormat,
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'combined.log',
      format: fileFormat,
    }),
  ],
})

export class AppLogger extends ConsoleLogger {
  constructor(context = '', options: ConsoleLoggerOptions = {}) {
    super(context, options)
  }

  error(message: string) {
    if (!this.context) return
    winstonLogger.error({ level: 'error', message, context: this.context })
  }

  warn(message: string) {
    if (!this.context) return
    winstonLogger.warn({ level: 'warn', message, context: this.context })
  }

  log(message: string) {
    if (!this.context) return
    winstonLogger.log({ level: 'info', message, context: this.context })
  }

  verbose(message: string) {
    if (!this.context) return
    winstonLogger.log({ level: 'verbose', message, context: this.context })
  }

  debug(message: string) {
    if (!this.context) return
    winstonLogger.log({ level: 'debug', message, context: this.context })
  }
}
