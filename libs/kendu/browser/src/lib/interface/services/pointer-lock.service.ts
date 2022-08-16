import { DOCUMENT } from '@angular/common'
import { Injectable, Inject } from '@angular/core'
import { fromEvent, share, NEVER, map } from 'rxjs'
import { camelCase } from '@decet/kendu-common'
import { InteractionLockService } from '../interfaces/interaction-lock.service'

interface PointerLockEventNames {
  requestPointerLock: 'requestPointerLock'
  exitPointerLock: 'exitPointerLock'
  pointerlockchange: 'pointerlockchange'
  pointerLockElement: 'pointerLockElement'
}

@Injectable({ providedIn: 'root' })
export class PointerLockService implements InteractionLockService {
  private eventNames: PointerLockEventNames = getEventNames(this.document)

  readonly isAvailable = isAvailable(this.document)

  readonly lockChange$ = this.isAvailable
    ? fromEvent(this.document, this.eventNames.pointerlockchange).pipe(
        map(() => this.isActive),
        share(),
      )
    : NEVER

  get isActive() {
    return this.isAvailable && document[this.eventNames.pointerLockElement] !== null
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  lock(element: HTMLElement): void {
    if (!this.isAvailable) return
    element[this.eventNames.requestPointerLock]()
  }

  unlock(): void {
    if (!this.isAvailable) return
    this.document[this.eventNames.exitPointerLock]()
  }

  isLocked(element: HTMLElement): boolean {
    if (!this.isAvailable) return false

    return this.document[this.eventNames.pointerLockElement] === element
  }
}

function getEventPrefix(document: Document) {
  return 'mozExitPointerLock' in document
    ? 'moz'
    : 'webkitExitPointerLock' in document
    ? 'webkit'
    : 'exitPointerLock' in document
    ? ''
    : null
}

function isAvailable(document: Document): boolean {
  return getEventPrefix(document) === null
}

function prefixEventNames(prefix: string): PointerLockEventNames {
  const eventNames = ['RequestPointerLock', 'ExitPointerLock', 'Pointerlockchange', 'PointerLockElement']
  const entries = eventNames.map((eventName) => [camelCase(eventName), camelCase(prefix + eventName)])

  return Object.fromEntries(entries) as unknown as PointerLockEventNames
}

function getEventNames(document: Document): PointerLockEventNames {
  const prefix = getEventPrefix(document) ?? ''

  return prefixEventNames(prefix)
}
