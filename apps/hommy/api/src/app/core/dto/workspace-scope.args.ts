import { Field, ArgsType, InputType, InterfaceType, Int } from '@nestjs/graphql'

@ArgsType()
@InputType()
@InterfaceType()
export class WorkspaceScoped {
  @Field(() => Int)
  workspaceId!: number
}
