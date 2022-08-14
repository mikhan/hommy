import { assertPasswordCredentialPayload, isValidPassword } from './password-credential'

export interface PasswordCredentialOptions {
  type: 'PASSWORD'
  username: string
  password: string
}

export type CredentialRequestOptions = PasswordCredentialOptions

export function isValidCredential(credential: { payload: unknown }, options: CredentialRequestOptions) {
  switch (options.type) {
    case 'PASSWORD':
      assertPasswordCredentialPayload(credential.payload)

      return isValidPassword(options.password, credential.payload.salt, credential.payload.hash)

    default:
      throw new Error(`Unknown credential type '${options.type}'`)
  }
}
