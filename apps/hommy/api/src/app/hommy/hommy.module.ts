import { Module } from '@nestjs/common'
import { DatabaseModule } from '../core/database.module'
import { GraphqlModule } from '../core/graphql.module'
import { ResidenteResolver } from './resolvers/residente.resolver'

@Module({
  imports: [DatabaseModule, GraphqlModule],
  providers: [ResidenteResolver],
})
export class HommyModule {}
