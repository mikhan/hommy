import { InjectionToken } from '@angular/core'
import { DashboardWidget } from '../interfaces/dashboard-widget'

export const DASHBOARD_WIDGETS = new InjectionToken<DashboardWidget[]>('Dashboard widgets token', {
  providedIn: 'root',
  factory: () => [],
})
