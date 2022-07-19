import { DynamicModule, Module } from '@nestjs/common'
import { Environment } from '../environments/environment'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
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
  static register(options: AppModuleOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot({
          environment: options.environment,
        }),
      ],
    }
  }
}
