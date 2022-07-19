import {
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { WorkspaceId } from '../../core/decorators/workspace-id.decorator'
import { PaginationArgs } from '../../core/dto/pagination.args'
import { ProjectScoped } from '../../core/dto/project-scope.args'
import { DatabaseService } from '../../core/services/database.service'
import { Neighbor } from '../models/neighbor.model'

@ArgsType()
export class GetNeighborArgs extends PaginationArgs {
  @Field(() => Int)
  id!: number
}

@InputType()
export class CreateNeighborInput {
  @Field()
  name!: string
  @Field()
  lastname!: string
}

@Resolver(() => Neighbor)
export class ResidenteResolver {
  constructor(private db: DatabaseService) {}

  @Query(() => Neighbor, { name: 'residente' })
  async getResidente(@Args() args: GetNeighborArgs) {
    return this.db.neighbor.findUnique({ where: { id: args.id } })
  }

  @Query(() => [Neighbor], { name: 'residentes' })
  async getResidentes(
    @WorkspaceId() workspaceId: number,
    @Args() { projectId }: ProjectScoped,
  ) {
    return this.db.neighbor.findMany({ where: { workspaceId, projectId } })
  }

  @Mutation(() => Neighbor, { name: 'addNeighbor' })
  async addNeighbor(
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
    @Args('projectId', { type: () => Int }) projectId: number,
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

  @ResolveField(() => [Neighbor])
  async profile(@Parent() residente: Neighbor) {
    return this.db.profile.findFirst({ where: { id: residente.profileId } })
  }
}
