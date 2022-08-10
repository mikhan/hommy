import { DynamicModule, Module } from '@nestjs/common'
// import { createEnvironment } from 'environment'
import { AppLogger } from './classes/logger'
import { NumberObfuscateService } from './services/number-obfuscate.service'

export interface CoreModuleOptions {
  environment?: object
}

// let environment: object

@Module({
  providers: [
    AppLogger,
    NumberObfuscateService,
    // { provide: ENVIRONMENT, useFactory: () => environment },
  ],
  exports: [AppLogger],
})
export class CoreModule {
  static forRoot(options: CoreModuleOptions): DynamicModule {
    // environment = createEnvironment(options.environment)

    // const logger = new Logger('ENV')
    // for (const [key, value] of Object.entries(environment)) {
    //   const string = typeof value === 'string' ? `"${value}"` : String(value)
    //   logger.debug(`${key}=${string}`)
    // }

    return {
      module: CoreModule,
    }
  }

  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  // }
}
