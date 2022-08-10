import { ArgsType, Field, Int, ID } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class PaginationArgs {
  @Min(1)
  @Field(() => ID)
  cursor?: number

  @Max(50)
  @Min(1)
  @Field(() => Int)
  take = 20
}
