import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Gender } from '../interfaces/gender'

@ObjectType()
export class Profile {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field()
  lastname!: string

  @Field(() => Int)
  age?: number

  @Field(() => Gender)
  gender?: Gender
}
