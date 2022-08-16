import { Inject, Injectable, Type } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DASHBOARD_WIDGETS } from '../constants/dashboard-widgets'
import { DashboardWidget } from '../interfaces/dashboard-widget'
import { DashboardWidgetComponent } from '../interfaces/dashboard-widget-component'

@Injectable({ providedIn: 'root' })
export class WidgetsManagerService {
  private widgetsMap = new Map<Type<DashboardWidgetComponent>, DashboardWidget>()

  private widgets = new BehaviorSubject<DashboardWidget[]>([])
  public widgets$ = this.widgets.asObservable()

  constructor(@Inject(DASHBOARD_WIDGETS) public dashboardWidgets: DashboardWidget[]) {
    for (const widget of dashboardWidgets) {
      this.widgetsMap.set(widget.component, widget)
    }

    this.widgets.next(dashboardWidgets)
  }

  getWidgets() {
    return this.dashboardWidgets
  }
}
