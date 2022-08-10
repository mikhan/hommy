import { Field, ID, ObjectType } from '@nestjs/graphql'
import { GenderEnum } from './gender-enum.model'

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID)
  id!: number

  name!: string

  lastname!: string

  age?: number

  gender?: GenderEnum
}
