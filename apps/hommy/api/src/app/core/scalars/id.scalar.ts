import { Injectable } from '@nestjs/common'
import { CustomScalar, Scalar } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-core'
import { Kind, ValueNode } from 'graphql'
import { environment } from '../../../environments/environment'
import { NumberObfuscateService } from '../services/number-obfuscate.service'

@Scalar('ID')
@Injectable()
export class IdScalar implements CustomScalar<string, number | null> {
  description =
    'The `ID` scalar type represents a obfuscated number id as a 12 character length string.'

  constructor(private hashid: NumberObfuscateService) {}

  parseValue(value: unknown): number {
    if (!(typeof value === 'string')) {
      throw new UserInputError(`Value must be a string`)
    }

    const decoded = this.decode(value)

    if (typeof decoded !== 'number') {
      throw new UserInputError(`Invalid ID`)
    }

    return decoded as number
  }

  serialize(value: unknown): string {
    if (typeof value !== 'number') {
      throw new UserInputError(`Value must be a number`)
    }

    return this.encode(value)
  }

  parseLiteral(ast: ValueNode): number | null {
    if (ast.kind === Kind.INT) {
      return this.decode(ast.value)
    }
    return null
  }

  private encode(value: number): string {
    return environment.PRODUCTION ? this.hashid.encode(value) : String(value)
  }

  private decode(value: string): number {
    return environment.PRODUCTION ? this.hashid.decode(value) : Number(value)
  }
}
