import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { SessionController } from './controllers/session.controller'
import { SessionService } from './services/session.service'

@Module({
  imports: [CoreModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
