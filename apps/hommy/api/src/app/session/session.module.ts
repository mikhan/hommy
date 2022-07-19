import { Module } from '@nestjs/common'
import { DatabaseModule } from '../core/database.module'
import { SessionController } from './controllers/session.controller'
import { SessionService } from './services/session.service'

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
