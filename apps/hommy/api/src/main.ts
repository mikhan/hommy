import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { DatabaseService } from './app/core/services/database.service'

async function bootstrap() {
  const globalPrefix = 'api'
  const port = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(globalPrefix)
  await app.listen(port)

  Logger.log(
    `🚀 Application is up on: http://localhost:${port}/${globalPrefix}`,
  )

  const databseService = app.get(DatabaseService)
  await databseService.enableShutdownHooks(app)
}

bootstrap()
