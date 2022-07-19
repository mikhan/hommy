import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProjectScoped } from '../../core/dto/project-scope.args'
import { Profile } from './profile.model'

@ObjectType()
export class Neighbor extends ProjectScoped {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  workspaceId!: number

  @Field(() => Int)
  projectId!: number

  @Field()
  name!: string

  @Field(() => Int)
  profileId!: number

  @Field(() => Profile)
  profile!: Profile
}
