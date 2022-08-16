import 'reflect-metadata'
import { isObservable, map, Observable } from 'rxjs'
import { OneOrMany } from '../../common/interfaces/one-or-many'
import { Type } from '../../common/interfaces/type'
import { instanceFromObject } from '../utilities/transform'
import { validateInstance } from '../utilities/validate'

export type DTOConstructor<T extends DTO> = typeof DTO & { new (): T }

function createDTOInstance<T extends object, I extends object[] | object>(dto: Type<T>, object: I): OneOrMany<I, T> {
  const instance = instanceFromObject(dto, object)
  validateInstance(instance)

  return instance
}

function createObservableDTOInstance<T extends object, I extends object | object[]>(
  dto: Type<T>,
  observable: Observable<I>,
): Observable<OneOrMany<I, T>> {
  return observable.pipe(map((object) => createDTOInstance(dto, object)))
}

export function asDTO<TBase extends Type<{}>>(Constructor: TBase) {
  type V = InstanceType<TBase>
  return class DTO {
    static from<I extends object[] | object>(object: Observable<I>): Observable<OneOrMany<I, V>>
    static from<I extends object[] | object>(object: Promise<I>): Promise<OneOrMany<I, V>>
    static from<I extends object[] | object>(object: I): OneOrMany<I, V>
    static from<I extends object[] | object>(object: Observable<I> | Promise<I> | I) {
      if (isObservable(object)) return createObservableDTOInstance(Constructor, object)
      else return createDTOInstance(this, object)
    }

    static validate<I extends object | object[]>(instance: I): I {
      return validateInstance(instance)
    }
  }
}

export class DTO {
  static from<T extends object, I extends object[] | object>(
    this: DTOConstructor<T>,
    object: Observable<I>,
  ): Observable<OneOrMany<I, T>>
  static from<T extends object, I extends object[] | object>(
    this: DTOConstructor<T>,
    object: I | Observable<I>,
  ): OneOrMany<I, T>
  static from<T extends object, I extends object[] | object>(this: DTOConstructor<T>, object: I | Observable<I>) {
    if (isObservable(object)) return createObservableDTOInstance(this, object)
    else return createDTOInstance(this, object)
  }

  static validate<I extends object | object[]>(instance: I): I {
    return validateInstance(instance)
  }
}
