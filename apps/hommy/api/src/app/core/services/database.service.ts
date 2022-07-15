import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

const PrismaClientOptions = {
  log: [
    { level: 'query', emit: 'event' } as const,
    { level: 'error', emit: 'stdout' } as const,
    { level: 'info', emit: 'stdout' } as const,
    { level: 'warn', emit: 'stdout' } as const,
  ],
}

type PrismaClientOptions = typeof PrismaClientOptions

function getQueryFromEvent(event: Prisma.QueryEvent) {
  const params = Object.fromEntries(
    Object.entries(JSON.parse(event.params) as unknown[]).map(
      ([key, value]) => {
        key = `$${Number(key) + 1}`
        value = typeof value === 'string' ? `"${value}"` : String(value)
        return [key, value] as [string, string]
      },
    ),
  )

  return event.query.replace(/\$(\d+)/g, (param) => params[param])
}

@Injectable()
export class DatabaseService
  extends PrismaClient<PrismaClientOptions>
  implements OnModuleInit
{
  private logger = new Logger('Database', { timestamp: true })

  constructor() {
    super(PrismaClientOptions)
  }

  async onModuleInit() {
    await this.$connect()

    this.$on('query', (event) => this.logQuery(event))
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  logQuery(event: Prisma.QueryEvent) {
    this.logger.verbose(getQueryFromEvent(event))
  }
}
