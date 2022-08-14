import { coerceElement } from '@angular/cdk/coercion'
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core'
import { Observable, Subject, Observer, shareReplay, delayWhen, animationFrames } from 'rxjs'
import { takeUntil, finalize } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class ResizeObserverFactory {
  create(callback: ResizeObserverCallback): ResizeObserver | null {
    return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback)
  }
}

@Injectable({ providedIn: 'root' })
export class ResizeObserveService implements OnDestroy {
  private observedElements = new Map<Element, Observable<ResizeObserverEntry[]>>()

  private onDestroy$ = new Subject()

  constructor(private zone: NgZone, private resizeObserverFactory: ResizeObserverFactory) {}

  ngOnDestroy() {
    this.onDestroy$.next(null)
  }

  observe(elementOrRef: Element | ElementRef<Element>): Observable<ResizeObserverEntry[]> {
    const element = coerceElement(elementOrRef)

    const observable =
      this.observedElements.get(element) ??
      this.createObservable(element).pipe(
        delayWhen(() => animationFrames()),
        takeUntil(this.onDestroy$),
        finalize(() => this.observedElements.delete(element)),
        shareReplay(),
      )

    this.observedElements.set(element, observable)

    return observable
  }

  private createObservable(element: Element): Observable<ResizeObserverEntry[]> {
    return new Observable((observer: Observer<ResizeObserverEntry[]>) => {
      const resizeObserver = this.resizeObserverFactory.create((mutations) => {
        this.zone.run(() => observer.next(mutations))
      })

      if (resizeObserver) resizeObserver.observe(element)

      return () => {
        if (resizeObserver) resizeObserver.unobserve(element)
      }
    })
  }
}
