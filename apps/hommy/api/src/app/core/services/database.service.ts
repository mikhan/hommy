import {
  INestApplicationContext,
  Injectable,
  OnModuleInit,
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { DATABASE_LOGGER } from '../constants/database-logger'

const PrismaClientOptions = {
  log: [
    { level: 'query', emit: 'event' } as const,
    { level: 'info', emit: 'event' } as const,
    { level: 'warn', emit: 'event' } as const,
    { level: 'error', emit: 'event' } as const,
  ],
}

type PrismaClientOptions = typeof PrismaClientOptions

function getQueryFromEvent(event: Prisma.QueryEvent) {
  // const params = Object.fromEntries(
  //   Object.entries(JSON.parse(event.params) as unknown[]).map(
  //     ([key, value]) => {
  //       key = `$${Number(key) + 1}`
  //       value = typeof value === 'string' ? `"${value}"` : String(value)
  //       return [key, value] as [string, string]
  //     },
  //   ),
  // )

  return (
    event.query
      .replace(/"(\w+)"(?=\.)|(?<=\.)"(\w+)"/g, '$1$2')
      .replace(/public\./g, '')
      // .replace(/\$(\d+)/g, (param) => params[param])
      .replace(/ LIMIT 1 OFFSET 0/, '')
  )
}

@Injectable()
export class DatabaseService
  extends PrismaClient<PrismaClientOptions>
  implements OnModuleInit
{
  constructor() {
    super(PrismaClientOptions)
  }

  async onModuleInit() {
    await this.$connect()

    // this.$use(async (params, next) => {
    //   const before = Date.now()
    //   const result = await next(params)
    //   const after = Date.now()
    //   const duration = after - before
    //   const log = `Query ${params.model}.${params.action} (${duration}ms)`
    //   DATABASE_LOGGER.debug(log)

    //   return result
    // })

    this.$on('query', (event) => this.logQuery(event))
    this.$on('info', (event) => this.logInfo(event))
    this.$on('warn', (event) => this.logWarn(event))
    this.$on('error', (event) => this.logError(event))
  }

  async enableShutdownHooks(app: INestApplicationContext) {
    this.$on('beforeExit', async () => await app.close())
  }

  private logQuery(event: Prisma.QueryEvent) {
    DATABASE_LOGGER.debug(getQueryFromEvent(event))
  }

  private logInfo(event: Prisma.LogEvent) {
    DATABASE_LOGGER.verbose(event.message)
  }

  private logWarn(event: Prisma.LogEvent) {
    DATABASE_LOGGER.warn(event.message)
  }

  private logError(event: Prisma.LogEvent) {
    DATABASE_LOGGER.error(event.message)
  }
}
