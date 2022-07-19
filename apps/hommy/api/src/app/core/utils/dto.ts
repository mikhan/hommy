import { ClassConstructor, plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

export function createInstance<T, V>(cls: ClassConstructor<T>, plain: V): T
export function createInstance<T, V>(cls: ClassConstructor<T>, plain: V[]): T[]
export function createInstance<T, V>(cls: ClassConstructor<T>, plain: V | V[]) {
  return plainToClass(cls, plain)
}

export function assertIsValidDTO(value: object) {
  const errors = validateSync(value, {
    forbidUnknownValues: true,
    skipMissingProperties: false,
    whitelist: true,
  })

  if (errors.length) {
    throw new Error(errors[0].toString())
  }
}
