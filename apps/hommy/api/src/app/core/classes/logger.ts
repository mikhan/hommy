import { join } from 'node:path'
import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common'
import * as winston from 'winston'
import { environment } from '../../../environments/environment'

function createTransportFile(level: string) {
  const directory = environment.LOG_DIRECTORY
  const prefix = environment.LOG_PREFIX
  const name = (prefix ? prefix + '-' : '') + level + '.log'
  const filename = join(process.cwd(), directory, name)

  return new winston.transports.File({ level, filename })
}

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [createTransportFile('error'), createTransportFile('info')],
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
