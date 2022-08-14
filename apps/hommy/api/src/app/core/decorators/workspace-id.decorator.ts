import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const WorkspaceId = createParamDecorator(function (_data: unknown, context: ExecutionContext) {
  const contextType = context.getType<'http' | 'graphql'>()

  if (contextType === 'graphql') {
    const graphqlContext = GqlExecutionContext.create(context)
    const workspaceId = graphqlContext.getArgs<{ workspaceId?: number }>().workspaceId

    return workspaceId
  }
})
