import { DOCUMENT } from '@angular/common'
import { Injectable, Inject } from '@angular/core'
import { share, Subject } from 'rxjs'
import { InteractionLockService } from '../interfaces/interaction-lock.service'

@Injectable({ providedIn: 'root' })
export class OverlayLockService implements InteractionLockService {
  readonly isAvailable = true

  private lockChange = new Subject<boolean>()
  readonly lockChange$ = this.lockChange.asObservable().pipe(share())

  get isActive() {
    return this.lockElement !== null
  }

  private container: HTMLElement
  private overlay: HTMLDivElement

  constructor(@Inject(DOCUMENT) document: Document) {
    this.container = document.body
    this.overlay = document.createElement('div')
    this.overlay.style.setProperty('position', 'fixed')
    this.overlay.style.setProperty('inset', '0')
    this.overlay.style.setProperty('z-index', '1000')
  }

  private lockElement: HTMLElement | null = null

  lock(element: HTMLElement): void {
    this.lockElement = element
    this.lockElement.blur()
    if (!this.container.contains(this.overlay)) {
      this.container.appendChild(this.overlay)
    }
  }

  unlock(): void {
    this.lockElement?.focus()
    this.lockElement = null
    if (this.container.contains(this.overlay)) {
      this.container.removeChild(this.overlay)
    }
  }

  isLocked(element: HTMLElement): boolean {
    return this.lockElement === element
  }
}
