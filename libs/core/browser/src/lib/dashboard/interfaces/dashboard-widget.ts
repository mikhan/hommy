import { Type } from '@angular/core'
import { DashboardWidgetComponent } from './dashboard-widget-component'

export interface DashboardWidget {
  component: Type<DashboardWidgetComponent>
  cols?: number | 'full'
  rows?: number
}
