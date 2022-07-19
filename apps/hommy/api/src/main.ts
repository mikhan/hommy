import { exit } from 'process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AppLogger } from './app/core/classes/logger'
import { CORE_LOGGER } from './app/core/constants/core-logger'
import { ENVIRONMENT } from './app/core/constants/environment'
import { DatabaseService } from './app/core/services/database.service'
import { Environment } from './environments/environment'

async function bootstrap() {
  console.clear()

  const module = AppModule.register({ environment: Environment.init() })
  const app = await NestFactory.create(module, { bufferLogs: true })
  const environment = app.get<Environment>(ENVIRONMENT)

  app.useLogger(app.get(AppLogger))

  const databaseService = app.get(DatabaseService)
  await databaseService.enableShutdownHooks(app)

  app.enableCors()

  const apiPrefix = environment.API_PREFIX
  const apiRestPrefix = environment.API_REST_PREFIX
  app.setGlobalPrefix(apiPrefix + apiRestPrefix)

  app.useGlobalPipes(new ValidationPipe())

  const serverHostname = environment.SERVER_HOSTNAME
  const serverPort = environment.SERVER_PORT
  await app.listen(serverPort, serverHostname)

  const apiBase = `http://${serverHostname}:${serverPort}${apiPrefix}${apiRestPrefix}`
  CORE_LOGGER.log(`🚀 Application is up on: ${apiBase}`)
}

bootstrap().catch((error) => {
  CORE_LOGGER.error(error?.message || String(error))
  exit(1)
})
