import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date | null> {
  description = 'Date custom scalar type'

  parseValue(value: unknown): Date {
    if (!(typeof value === 'number')) {
      throw new TypeError(`Value must be a number`)
    }

    return new Date(value)
  }

  serialize(value: unknown): number {
    if (!(value instanceof Date)) {
      throw new TypeError(`Value must be instance of Date object`)
    }

    return value.getTime()
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  }
}
