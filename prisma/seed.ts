import { NestFactory } from '@nestjs/core'
import { DatabaseService } from '../apps/hommy/api/src/app/core/services/database.service'
import { SeedService } from './seed/seed.service'
import { SeedModule } from './seed/seed.module'
import { seed } from './seed/data'

async function main() {
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: false,
  })

  const databaseService = app.get(DatabaseService)
  await databaseService.enableShutdownHooks(app)

  await app.get(SeedService).init(seed)

  await app.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
