import { Credential } from '@prisma/client'
import { PasswordCredential, assertPasswordCredentialPayload, isValidPassword } from './password-credential'

export type GetCredentialOptions = PasswordCredential

export function isValidCredential(
  credential: Pick<Credential, 'userId' | 'payload'>,
  options: GetCredentialOptions
) {
  if (options.type === 'PASSWORD') {
    assertPasswordCredentialPayload(credential.payload)

    return isValidPassword(
      options.password,
      credential.payload.salt,
      credential.payload.hash
    )
  }
}
