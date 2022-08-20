import { plainToClass, ClassTransformOptions, classToPlain, serialize, deserialize } from 'class-transformer'
import { Constructor } from '../../common/interfaces/constructor'
import { OneOrMany } from '../../common/interfaces/utilities'

const defaultTransformerOptions: TransformOptions = {
  enableImplicitConversion: true,
}

export type TransformOptions = ClassTransformOptions

export function instanceFromObject<I, V extends object | object[]>(
  dto: Constructor<I>,
  object: V,
  options?: TransformOptions,
): OneOrMany<V, I> {
  return plainToClass(dto, object, { ...defaultTransformerOptions, ...options }) as any
}

export function instanceToObject<I extends object | object[]>(
  instance: I,
  options?: TransformOptions,
): OneOrMany<I, Record<string, unknown>> {
  return classToPlain(instance, { ...defaultTransformerOptions, ...options }) as any
}

export function instanceFromJSON<I extends object>(dto: Constructor<I>, json: string, options?: TransformOptions): I {
  return deserialize(dto, json, options)
}

export function instanceToJSON<I extends object>(instance: I, options?: TransformOptions): string {
  return serialize(instance, options)
}
