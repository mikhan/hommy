import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module, DynamicModule } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
  KeyValueCache,
} from 'apollo-server-core'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLUpload } from 'graphql-upload'
import { CoreModule } from './core.module'
import { upperDirective, upperDirectiveTransformer } from './directives/upercase.directive'
import { ComplexityPlugin } from './plugins/complexity.plugin'
import { LoggingPlugin } from './plugins/logging.plugin'
import { IdScalar } from './scalars/id.scalar'

export interface GraphqlModuleOptions {
  path?: string
  cache?: KeyValueCache
  production?: boolean
}

function getPlaygroundPlugin(production: boolean) {
  return production
    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
    : ApolloServerPluginLandingPageLocalDefault()
}

@Module({})
export class GraphqlModule {
  static forRoot(options: GraphqlModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: () => ({
            // TODO: Implement cors
            path: options.path,
            autoSchemaFile: join(process.cwd(), 'graphql', 'schema.gql'),
            sortSchema: true,
            playground: false,
            cache: options.cache ?? 'bounded',
            csrfPrevention: true,
            plugins: [getPlaygroundPlugin(!!options.production)],
            transformSchema: (schema) => {
              return upperDirectiveTransformer(schema, 'upper')
            },
            subscriptions: { 'graphql-ws': true },
            resolvers: {
              JSON: GraphQLJSON,
              Upload: GraphQLUpload,
            },
            buildSchemaOptions: {
              numberScalarMode: 'integer',
              directives: [upperDirective],
            },
          }),
        }),
      ],
      providers: [ComplexityPlugin, LoggingPlugin, IdScalar],
    }
  }
}
