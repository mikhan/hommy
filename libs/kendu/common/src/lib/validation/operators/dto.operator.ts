import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DTOConstructor } from '../classes/dto'

export function dto<I extends object>(dto: DTOConstructor<I>) {
  return <O extends object | object[]>(source: Observable<O>) => source.pipe(map((data) => dto.from<I, O>(data)))
}
