import { Field, ArgsType, InputType, InterfaceType, Int } from '@nestjs/graphql'

@ArgsType()
@InputType()
@InterfaceType()
export class ProjectScoped {
  @Field(() => Int)
  workspaceId!: number

  @Field(() => Int)
  projectId!: number
}
