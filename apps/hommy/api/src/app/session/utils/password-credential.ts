import * as crypto from 'node:crypto'

export function generateSalt(rounds = 12) {
  if (rounds >= 15) throw new Error(`${rounds} must be less that 15`)

  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString('hex')
    .slice(0, rounds)
}

export function hashPassword(password: string, salt: string) {
  const hasher = crypto.createHmac('sha512', salt)

  return hasher.update(password).digest('hex')
}

export function assertPasswordCredentialPayload(payload: unknown): asserts payload is { salt: string; hash: string } {
  if (!(typeof payload === 'object') || payload === null) {
    throw new Error('Invalid credential payload')
  }
}

export function isValidPassword(password: string, salt: string, hash: string) {
  return hashPassword(password, salt) === hash
}
