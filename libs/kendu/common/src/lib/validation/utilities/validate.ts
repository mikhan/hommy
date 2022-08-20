import { ClassTransformOptions } from 'class-transformer'
import { ValidationError, validateSync, ValidatorOptions } from 'class-validator'
import { Constructor } from '../../common/interfaces/constructor'
import { assertIsObject } from '../../common/utilities/assertions'
import { isUndefined } from '../../common/utilities/predicate'
import { ValidationException } from '../interfaces/validation-exception'
import { instanceFromObject, instanceToObject } from './transform'

const defaultValidatorOptions: ValidatorOptions = {
  forbidUnknownValues: true,
  skipMissingProperties: false,
  whitelist: true,
}

export type ValidateInstanceObject = ValidatorOptions

export function validateInstance<I extends any | any[]>(instance: I, options?: ValidateInstanceObject): I {
  if (Array.isArray(instance)) {
    for (const item of instance) validateOneInstance(item, options)
  } else {
    validateOneInstance(instance, options)
  }

  return instance
}

export function validateOneInstance<I>(instance: I, options?: ValidateInstanceObject): I {
  assertIsObject<object>(instance)
  const errors = validateSync(instance, { ...defaultValidatorOptions, ...options })

  if (errors.length) {
    const errorInstances = flattenErrors(errors, (e) => e)
    const errorMessage = flattenErrors(errors, (e) => errorToString(e)).join('\n')
    throw new ValidationException(errorInstances, errorMessage)
  }

  return instance
}

export type ValidateObjectOptions = ClassTransformOptions & ValidatorOptions

export function validateObject<V extends object | object[]>(
  object: V,
  constructor: Constructor<any>,
  options?: ValidateObjectOptions,
): V {
  return instanceToObject(validateInstance(instanceFromObject(constructor, object, options), options), options) as V
}

export function errorToString(error: ValidationError): string | undefined {
  if (error.constraints) {
    const constraints = Object.entries(error.constraints)
      .map(([validation, message]) => `  ${validation}: ${message}`)
      .join('\n')

    return `Invalid property "${error.property}" {\n${constraints}\n}`
  }

  return
}

export function flattenErrors<T>(
  errors: Iterable<ValidationError>,
  mapFn: (error: ValidationError) => T | undefined,
  array: T[] = [],
  parentProperty?: string,
): T[] {
  for (const error of errors) {
    const property = parentProperty ? `${parentProperty}.${error.property}` : error.property
    const value = mapFn({ ...error })

    if (!isUndefined(value)) array.push(value)

    if (error.children && error.children.length) {
      flattenErrors(error.children, mapFn, array, property)
    }
  }

  return array
}
