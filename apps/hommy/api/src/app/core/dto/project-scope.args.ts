import { Field, ArgsType, InputType, InterfaceType, ID } from '@nestjs/graphql'

@ArgsType()
@InputType()
@InterfaceType()
export class ProjectScoped {
  @Field(() => ID)
  workspaceId!: number

  @Field(() => ID)
  projectId!: number
}
