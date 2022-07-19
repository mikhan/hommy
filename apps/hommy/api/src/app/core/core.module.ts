import { DynamicModule, Module } from '@nestjs/common'
import { AppLogger } from './classes/logger'
import { CORE_LOGGER } from './constants/core-logger'
import { ENVIRONMENT } from './constants/environment'

export interface CoreModuleOptions {
  environment: object
}

let environment: object

@Module({
  providers: [
    AppLogger,
    { provide: ENVIRONMENT, useFactory: () => environment },
  ],
  exports: [AppLogger, ENVIRONMENT],
})
export class CoreModule {
  static forRoot(options: CoreModuleOptions): DynamicModule {
    if (environment) throw new Error('Environment has already been defined')

    environment = options.environment

    for (const [key, value] of Object.entries(options.environment)) {
      const string = typeof value === 'string' ? `"${value}"` : String(value)
      CORE_LOGGER.debug(`${key}: ${string}`)
    }

    return {
      module: CoreModule,
    }
  }

  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  // }
}
