import { DOCUMENT } from '@angular/common'
import { Directive, NgModule, ElementRef, Inject, Optional, Injectable, AfterViewInit } from '@angular/core'
import { NgControl } from '@angular/forms'
import {
  BehaviorSubject,
  defer,
  distinctUntilChanged,
  filter,
  finalize,
  fromEvent,
  map,
  race,
  single,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs'
import { InteractionLockService, OverlayLockService, PointerLockService } from '@decet/kendu-browser'
import { clamp, round } from '@decet/kendu-common'

export class ValueDragControl {
  private mouseup$ = fromEvent(window, 'mouseup')
  private mousedown$ = fromEvent<MouseEvent>(this.element, 'mousedown')
  private mousemove$ = this.mousedown$.pipe(
    switchMap(() =>
      fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
        map(({ movementX, movementY }) => ({
          deltaX: movementX,
          deltaY: movementY,
        })),
        takeUntil(race(this.mouseup$, this.unlock$)),
        tap({
          next: () => this.lockRequests.next(true),
          complete: () => this.lockRequests.next(false),
        }),
      ),
    ),
  )

  private lock$ = this.lockService.lockChange$.pipe(filter((isActive) => isActive))
  private unlock$ = this.lock$.pipe(single(() => !this.lockService.isLocked(this.element)))

  private lockRequests = new BehaviorSubject<boolean>(false)
  private lockRequests$ = this.lockRequests.pipe(
    distinctUntilChanged(),
    tap((isLocked) => this.lockInteraction(isLocked)),
  )

  readonly changes$ = defer(() => {
    const lockRequestsSubscription = this.lockRequests$.subscribe()

    return this.mousemove$.pipe(finalize(() => lockRequestsSubscription.unsubscribe()))
  })

  constructor(private document: Document, private lockService: InteractionLockService, private element: HTMLElement) {}

  private lockInteraction(isLocked: boolean) {
    if (isLocked && !this.lockService.isActive) {
      this.lockService.lock(this.element)
    } else if (!isLocked && this.lockService.isActive) {
      this.lockService.unlock()
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ValueDragManagerService {
  private lockService: InteractionLockService

  constructor(
    @Inject(DOCUMENT) private document: Document,
    pointerLockService: PointerLockService,
    overlayLockService: OverlayLockService,
  ) {
    this.lockService = pointerLockService.isAvailable ? pointerLockService : overlayLockService
  }

  connect(elementRef: ElementRef<HTMLElement>) {
    const control = new ValueDragControl(this.document, this.lockService, elementRef.nativeElement)

    return control.changes$
  }
}

// @Directive({
//   selector: '[coreThemeDrag]',
// })
// export class NumberDragDirective implements OnInit, OnDestroy {
//   private changes = new Subject<{ deltaX: number; deltaY: number }>()
//   readonly changes$ = this.changes.asObservable()

//   private element: HTMLElement = this.elementRef.nativeElement

//   private lockService = this.pointerLockService.isAvailable ? this.pointerLockService : this.overlayLockService
//   private lockRequests = new BehaviorSubject<boolean>(false)
//   private lockRequests$ = this.lockRequests.pipe(distinctUntilChanged())

//   private lock$ = this.lockService.lockChange$.pipe(filter((isActive) => isActive))
//   private unlock$ = this.lock$.pipe(single(() => !this.lockService.isLocked(this.element)))
//   private mouseup$ = fromEvent(window, 'mouseup')
//   private mousedown$ = fromEvent<MouseEvent>(this.element, 'mousedown')
//   private mousemove$ = fromEvent<MouseEvent>(this.document, 'mousemove')
//   private stop = race(this.mouseup$, this.unlock$)
//   private start$ = this.mousedown$.pipe(
//     switchMap(() =>
//       this.mousemove$.pipe(
//         map(({ movementX, movementY }) => ({
//           deltaX: movementX,
//           deltaY: movementY,
//         })),
//         takeUntil(this.stop),
//         tap({
//           next: () => this.lockRequests.next(true),
//           complete: () => this.lockRequests.next(false),
//         }),
//       ),
//     ),
//   )

//   private startSubscription!: Subscription
//   private lockRequestsSubscription!: Subscription

//   constructor(
//     @Inject(DOCUMENT) private document: Document,
//     private elementRef: ElementRef<HTMLElement>,
//     private pointerLockService: PointerLockService,
//     private overlayLockService: OverlayLockService,
//   ) {}

//   ngOnInit() {
//     this.startSubscription = this.start$.subscribe(this.changes)
//     this.lockRequestsSubscription = this.lockRequests$.subscribe((isLocked) => this.lockInteraction(isLocked))
//   }

//   ngOnDestroy() {
//     this.startSubscription.unsubscribe()
//     this.lockRequestsSubscription.unsubscribe()
//   }

//   lockInteraction(isLocked: boolean) {
//     if (isLocked && !this.lockService.isActive) {
//       this.lockService.lock(this.element)
//     } else if (!isLocked && this.lockService.isActive) {
//       this.lockService.unlock()
//     }
//   }
// }

function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1].length ?? 0
}

function asNumber(value: unknown, def = 0): number {
  return isFinite(value as number) ? Number(value) : def
}

@Directive({
  selector: 'input[coreThemeDrag]',
})
export class NumberInputDragDirective implements AfterViewInit {
  private min = -Infinity
  private max = +Infinity
  private step = 1
  private decimals = 1

  private changes$ = this.valueDragManagerService.connect(this.elementRef).pipe(
    map(({ deltaX, deltaY }) => {
      const delta = deltaX + deltaY
      let value = asNumber(this.elementRef.nativeElement.value)
      value = value - delta * this.step
      value = clamp(this.min, this.max, value)

      return round(value, this.decimals)
    }),
  )

  constructor(
    private valueDragManagerService: ValueDragManagerService,
    private elementRef: ElementRef<HTMLInputElement>,
    @Optional() ngControl?: NgControl,
  ) {
    const updateValue = ngControl
      ? (value: number) => ngControl.control?.setValue(value)
      : (value: number) => (this.elementRef.nativeElement.valueAsNumber = value)

    this.changes$.subscribe((value) => updateValue(value))
  }

  ngAfterViewInit(): void {
    this.min = asNumber(this.elementRef.nativeElement.getAttribute('min'), -Infinity)
    this.max = asNumber(this.elementRef.nativeElement.getAttribute('max'), +Infinity)
    this.step = asNumber(this.elementRef.nativeElement.getAttribute('step'), 1)
    this.decimals = countDecimals(this.step)
  }
}

@NgModule({
  declarations: [NumberInputDragDirective],
  exports: [NumberInputDragDirective],
})
export class NumberInputDragDirectiveModule {}
