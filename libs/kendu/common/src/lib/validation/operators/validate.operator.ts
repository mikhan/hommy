// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Constructor } from '../../common/interfaces/constructor'
import { validateInstance, validateObject } from '../utilities/validate'

type validateDTOOperator = <T>(source: Observable<T>) => Observable<T>
type validateObjOperator<T> = (source: Observable<T>) => Observable<T>

export function validate(): validateDTOOperator
export function validate<T>(dto: Constructor<T>): validateObjOperator<T>
export function validate<T>(dto?: Constructor<T>) {
  return dto
    ? (((source) => source.pipe(map((data) => validateObject(data, dto)))) as unknown as validateObjOperator<T>)
    : (((source) => source.pipe(map((data) => validateInstance(data)))) as validateDTOOperator)
}
