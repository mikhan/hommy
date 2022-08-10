import { Module } from '@nestjs/common'
import { DatabaseModule } from '../core/database.module'
import { ResidenteResolver } from './resolvers/neighbor.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [ResidenteResolver],
})
export class HommyModule {}
