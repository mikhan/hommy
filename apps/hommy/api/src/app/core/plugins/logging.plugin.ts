import { Plugin } from '@nestjs/apollo'
import { GraphQLRequestContext } from 'apollo-server-core'
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'
import { GRAPHQL_LOGGER } from '../constants/graphql-logger'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    context: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener | undefined> {
    if (context.request.operationName === 'IntrospectionQuery') return

    const { query } = context.request
    if (query) {
      GRAPHQL_LOGGER.debug(query.replace(/\n/g, '\\n'))
    }

    return {
      async willSendResponse(context) {
        const operationName = context.request.operationName
        const operation = context.operation?.operation
        const variables = context.request.variables
        const args = variables ? JSON.stringify(variables) : ''

        GRAPHQL_LOGGER.log(`${operation} ${operationName}(${args})`)
      },
    }
  }
}
