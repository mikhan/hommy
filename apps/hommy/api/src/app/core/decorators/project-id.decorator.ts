import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const ProjectId = createParamDecorator(function (_data: unknown, context: ExecutionContext) {
  const contextType = context.getType<'http' | 'graphql'>()

  if (contextType === 'graphql') {
    const graphqlContext = GqlExecutionContext.create(context)
    const projectId = graphqlContext.getArgs<{ projectId?: number }>().projectId

    return projectId
  }
})
