import { Plugin } from '@nestjs/apollo'
import { GraphQLRequestContext, VariableValues } from 'apollo-server-core'
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base'
import { GRAPHQL_LOGGER } from '../constants/graphql-logger'

function stringifyVariables(variables?: VariableValues) {
  if (!variables) return ''

  return Object.entries(variables)
    .map(([key, value]) => {
      if (Object(value) === value) value = `{ ${stringifyVariables(value)} }`
      else if (typeof value === 'string') value = `"${value}"`
      else value = String(value)

      return `${key}: ${value}`
    })
    .join(', ')
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(context: GraphQLRequestContext): Promise<GraphQLRequestListener | undefined> {
    const before = Date.now()
    if (context.request.operationName === 'IntrospectionQuery') return

    // const { query } = context.request
    // if (query) {
    //   GRAPHQL_LOGGER.debug(query.replace(/\n/g, '\\n'))
    // }

    return {
      async willSendResponse(context) {
        const after = Date.now()
        const duration = after - before
        const operationName = context.request.operationName
        const operation = context.operation?.operation
        const variables = context.request.variables
        const args = stringifyVariables(variables)

        GRAPHQL_LOGGER.log(`${operation} ${operationName}(${args}) (${duration})ms`)
      },
    }
  }
}
