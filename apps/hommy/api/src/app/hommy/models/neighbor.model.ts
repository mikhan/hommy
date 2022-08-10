import { Field, ID, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { ProjectScoped } from '../../core/dto/project-scope.args'
import { ProfileModel } from './profile.model'

@ObjectType('Neighbor')
export class NeighborModel extends ProjectScoped {
  @Field(() => ID)
  id!: number

  workspaceId!: number

  projectId!: number

  name!: string

  @Field(() => ID)
  profileId!: number

  profile!: ProfileModel

  capturedDate?: Date

  @Field(() => GraphQLJSON)
  json?: JSON
}
