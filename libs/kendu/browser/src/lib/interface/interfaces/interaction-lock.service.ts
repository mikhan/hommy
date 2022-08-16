import { Observable } from 'rxjs'

export interface InteractionLockService {
  readonly isAvailable: boolean

  readonly lockChange$: Observable<boolean>

  readonly isActive: boolean

  lock(element: HTMLElement): void

  unlock(): void

  isLocked(element: HTMLElement): boolean
}
