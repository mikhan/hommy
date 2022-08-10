import { exit } from 'process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload'
import { AppModule } from './app/app.module'
import { CORE_LOGGER } from './app/core/constants/core-logger'
import { DatabaseService } from './app/core/services/database.service'
import { environment } from './environments/environment'

async function bootstrap() {
  const module = AppModule.create({ environment })
  const app = await NestFactory.create(module, { logger: CORE_LOGGER })

  const databaseService = app.get(DatabaseService)
  await databaseService.enableShutdownHooks(app)

  app.enableCors()

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

  const apiPrefix = environment.API_PREFIX
  const apiRestPrefix = environment.API_REST_PREFIX
  app.setGlobalPrefix(apiPrefix + apiRestPrefix)

  app.useGlobalPipes(new ValidationPipe())

  const apiServerHostname = environment.API_SERVER_HOSTNAME
  const apiServerPort = environment.API_SERVER_PORT
  await app.listen(apiServerPort, apiServerHostname)

  const apiBase = `http://${apiServerHostname}:${apiServerPort}${apiPrefix}${apiRestPrefix}`
  CORE_LOGGER.log(`🚀 Application is up on: ${apiBase}`)
}

bootstrap().catch((error) => {
  CORE_LOGGER.error(error?.message || String(error))
  exit(1)
})
