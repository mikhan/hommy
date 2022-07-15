import { MiddlewareConsumer, Module } from '@nestjs/common'
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware'
import { DatabaseService } from './services/database.service'

@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService],
  exports:[DatabaseService]
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
