import { CustomScalar, Scalar } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-core'
import { Kind, ValueNode } from 'graphql'

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date | null> {
  description = 'The `Date` scalar type represents a javascript Date object.'

  parseValue(value: unknown): Date {
    if (!(typeof value === 'string')) {
      throw new UserInputError(`Value must be a string`)
    }

    return new Date(value)
  }

  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new UserInputError(`Value must be instance of Date object`)
    }

    return value.toJSON()
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  }
}
