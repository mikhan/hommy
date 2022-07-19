import { Controller, Get } from '@nestjs/common'
import { SessionService } from '../services/session.service'

@Controller('/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getData() {
    return this.sessionService.createToken({
      type: 'PASSWORD',
      username: 'root',
      password: 'root',
    })
  }
}
