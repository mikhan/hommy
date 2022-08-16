import { Injectable, NgZone } from '@angular/core'
import { animationFrames, BehaviorSubject, delayWhen, EMPTY, Observable, share, Subscriber, throttleTime } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class IntersectionObserverManagerService {
  readonly isAvailable = typeof IntersectionObserver !== 'undefined'

  constructor(private zone: NgZone) {}

  create(options?: IntersectionObserverInit): IntersectionObservable {
    if (!this.isAvailable) return new DummyIntersectionObservableService()

    return new IntersectionObservableService(this.zone, options)
  }
}

class IntersectionObservableService implements IntersectionObservable {
  #isActive = false
  get isActive(): boolean {
    return this.#isActive
  }

  private intersectionObserver = new IntersectionObserver((entries) => {
    this.zone.run(() => this.changes.next(entries))
  }, this.options)

  private targets = new Set<HTMLElement>()

  private changes = new BehaviorSubject<IntersectionObserverEntry[]>([])
  changes$ = new Observable<IntersectionObserverEntry[]>((observer) => {
    this.connect(observer)

    return () => this.disconnect()
  }).pipe(
    delayWhen(() => animationFrames()),
    throttleTime(150),
    share(),
  )

  constructor(private zone: NgZone, private options?: IntersectionObserverInit) {}

  private connect(observer: Subscriber<IntersectionObserverEntry[]>): () => void {
    this.#isActive = true
    this.changes.subscribe(observer)

    for (const target of this.targets) {
      this.intersectionObserver.observe(target)
    }

    return () => this.disconnect()
  }

  private disconnect(): void {
    this.#isActive = false
    this.changes.unsubscribe()
    this.intersectionObserver.disconnect()
  }

  observe(target: HTMLElement): void {
    if (this.targets.has(target)) return

    this.targets.add(target)

    if (this.#isActive) this.intersectionObserver.observe(target)
  }

  unobserve(target: HTMLElement): void {
    if (!this.targets.has(target)) return

    this.targets.delete(target)

    if (this.#isActive) this.intersectionObserver.unobserve(target)
  }
}

class DummyIntersectionObservableService implements IntersectionObservable {
  readonly isActive = false

  changes$ = EMPTY

  observe(_: HTMLElement) {
    return
  }

  unobserve(_: HTMLElement) {
    return
  }
}

export interface IntersectionObservable {
  readonly isActive: boolean
  readonly changes$: Observable<IntersectionObserverEntry[]>
  observe(element: HTMLElement): void
  unobserve(element: HTMLElement): void
}
