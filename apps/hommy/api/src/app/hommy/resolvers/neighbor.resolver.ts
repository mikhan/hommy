import { Args, ArgsType, Field, ID, InputType, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { PaginationArgs } from '../../core/dto/pagination.args'
import { ProjectScoped } from '../../core/dto/project-scope.args'
import { DatabaseService } from '../../core/services/database.service'
import { NeighborModel } from '../models/neighbor.model'

@ArgsType()
export class GetNeighborArgs {
  @Field(() => ID)
  id!: number
}

@ArgsType()
export class GetNeighborsArgs extends ProjectScoped {
  @Field(() => ID)
  id!: number
}

@InputType()
export class CreateNeighborInput {
  name!: string
  lastname!: string
}

@Resolver(() => NeighborModel)
export class ResidenteResolver {
  constructor(private db: DatabaseService) {}

  @Query(() => NeighborModel)
  async getNeighbor(@Args() args: GetNeighborArgs) {
    return this.db.neighbor.findUnique({ where: { id: args.id } })
  }

  @Query(() => [NeighborModel])
  async getNeighbors(@Args() { workspaceId, projectId }: ProjectScoped, @Args() pagination: PaginationArgs) {
    return this.db.neighbor.findMany({
      where: { workspaceId, projectId },
      cursor: { id: pagination.cursor },
      take: pagination.take,
      skip: 1,
    })
  }

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    console.log(file)

    return true
  }

  @Mutation(() => NeighborModel)
  async createNeighbor(
    @Args() { workspaceId, projectId }: ProjectScoped,
    @Args('input') neighbor: CreateNeighborInput,
  ) {
    return this.db.neighbor.create({
      data: {
        workspaceId: workspaceId,
        projectId: projectId,
        name: `${neighbor.name} ${neighbor.lastname}`,
        profile: {
          create: {
            name: neighbor.name,
            lastname: neighbor.lastname,
          },
        },
        capturedById: 1,
      },
    })
  }

  @ResolveField(() => [NeighborModel])
  async profile(@Parent() residente: NeighborModel) {
    return this.db.profile.findUnique({ where: { id: residente.profileId } })
  }
}
