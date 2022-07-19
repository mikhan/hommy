import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import { Environment } from '../../environments/environment.prod'
import { ENVIRONMENT } from './constants/environment'
import { CoreModule } from './core.module'
import {
  upperDirective,
  upperDirectiveTransformer,
} from './directives/upercase.directive'
import { ComplexityPlugin } from './plugins/complexity.plugin'
import { LoggingPlugin } from './plugins/logging.plugin'

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [CoreModule],
      inject: [ENVIRONMENT],
      driver: ApolloDriver,
      useFactory: (environment: Environment) => ({
        path: environment.API_PREFIX + environment.API_GRAPHQL_PREFIX,
        autoSchemaFile: join(process.cwd(), 'graphql', 'schema.gql'),
        sortSchema: true,
        playground: false,

        plugins: [
          environment.PRODUCTION
            ? ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageLocalDefault(),
        ],
        transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
        installSubscriptionHandlers: true,
        buildSchemaOptions: {
          directives: [upperDirective],
        },
      }),
    }),
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class GraphqlModule {}
