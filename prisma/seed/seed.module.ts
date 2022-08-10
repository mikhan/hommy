import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { DatabaseModule } from '../../apps/hommy/api/src/app/core/database.module'

@Module({
  providers: [SeedService],
  imports: [DatabaseModule],
})
export class SeedModule {}
