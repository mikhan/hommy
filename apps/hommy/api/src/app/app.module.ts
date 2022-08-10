import { KeyvAdapter } from '@apollo/utils.keyvadapter'
import { DynamicModule, Module, Logger } from '@nestjs/common'
import { Environment } from 'environment'
import Keyv from 'keyv'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { GraphqlModule } from './core/graphql.module'
import { HommyModule } from './hommy/hommy.module'
import { SessionModule } from './session/session.module'

export interface AppModuleOptions {
  environment: Environment
}

@Module({
  imports: [HommyModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static create({ environment }: AppModuleOptions): DynamicModule {
    const logger = new Logger('ENV')
    for (const [key, value] of Object.entries(environment)) {
      const string = typeof value === 'string' ? `"${value}"` : String(value)
      logger.debug(`${key}=${string}`)
    }

    return {
      module: AppModule,
      imports: [
        GraphqlModule.forRoot({
          path: environment.API_PREFIX + environment.API_GRAPHQL_PREFIX,
          cache: new KeyvAdapter(new Keyv(environment.REDIS_URL)),
          production: environment.PRODUCTION,
        }),
        CoreModule.forRoot({}),
      ],
    }
  }
}
