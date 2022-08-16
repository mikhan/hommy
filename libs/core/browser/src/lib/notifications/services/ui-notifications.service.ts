import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { share } from 'rxjs/operators'

// interface UiNotificationEventMap {
//   dismissed: CustomEvent<UiNotification>
// }

class UiNotification extends EventTarget {
  public readonly title: string
  public readonly body: string
  public readonly data: unknown
  public readonly tag: string
  public readonly silent: boolean

  private _dismissed = false
  public get dismissed() {
    return this._dismissed
  }

  constructor(title: string, config: { body?: string; data?: unknown; tag?: string; silent?: boolean } = {}) {
    super()
    this.title = title
    this.body = config.body ?? ''
    this.data = config.data ?? null
    this.tag = config.tag ?? ''
    this.silent = config.silent ?? false
  }

  public dismiss() {
    this._dismissed = true
    const event = new CustomEvent('dismissed', { detail: this })
    this.dispatchEvent(event)
  }
}

// class UiNotificationList<T extends UiNotification> extends Observable<T[]> {
//   private list: UiNotification[] = []
//   private notifications = new BehaviorSubject<UiNotification[]>([])
//   public notifications$ = this.notifications.asObservable().pipe(share())

//   public add(notification: UiNotification): void {
//     this.list.push(notification)
//   }

//   constructor(subscribe?: (subscriber: Subscriber<T[]>) => TeardownLogic) {
//     super(subscribe)
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class UiNotificationsService {
  private list: UiNotification[] = []
  private notifications = new BehaviorSubject<UiNotification[]>(this.list)
  public notifications$ = this.notifications.asObservable().pipe(share())

  public newMessages$ = this.notifications$

  public add(notification: UiNotification) {
    this.list.push(notification)
    this.notifications.next(this.list)
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) return 'default'

    const permission = Notification.permission
    if (permission === 'granted' || permission === 'denied') return permission

    try {
      return await Notification.requestPermission()
    } catch (e) {
      return new Promise((resolve) => Notification.requestPermission(resolve))
    }
  }
}
