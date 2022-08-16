import { plainToClass, ClassTransformOptions, classToPlain, serialize, deserialize } from 'class-transformer'
import { OneOrMany } from '../../common/interfaces/one-or-many'
import { Type } from '../../common/interfaces/type'

const defaultTransformerOptions: TransformOptions = {
  // excludeExtraneousValues: true,
  enableImplicitConversion: true,
}

export type TransformOptions = ClassTransformOptions

export function instanceFromObject<I, V extends object | object[]>(
  dto: Type<I>,
  object: V,
  options?: TransformOptions,
): OneOrMany<V, I> {
  return plainToClass(dto, object, {
    ...defaultTransformerOptions,
    ...options,
  }) as any
}

export function instanceToObject<I extends object | object[]>(
  instance: I,
  options?: TransformOptions,
): OneOrMany<I, Record<string, unknown>> {
  return classToPlain(instance, {
    ...defaultTransformerOptions,
    ...options,
  }) as any
}

export function instanceFromJSON<I extends object>(dto: Type<I>, json: string, options?: TransformOptions): I {
  return deserialize(dto, json, options)
}

export function instanceToJSON<I extends object>(instance: I, options?: TransformOptions): string {
  return serialize(instance, options)
}
