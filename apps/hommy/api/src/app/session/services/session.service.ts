import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DatabaseService } from '../../core/services/database.service'
import { CredentialRequestOptions, isValidCredential } from '../utils/credential'

@Injectable()
export class SessionService {
  constructor(private db: DatabaseService) {}

  async createToken(options: CredentialRequestOptions) {
    const credential = await this.getCredential(options)

    if (!credential) {
      throw new UnauthorizedException('Invalid user credential')
    }

    return credential
  }

  async getCredential(options: CredentialRequestOptions) {
    const credential = await this.db.credential.findUnique({
      select: { userId: true, payload: true },
      where: {
        typeAndUsername: {
          credentialType: options.type,
          username: options.username,
        },
      },
    })

    return credential && isValidCredential(credential, options) ? credential : null
  }
}
