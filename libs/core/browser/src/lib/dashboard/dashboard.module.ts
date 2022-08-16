import { ModuleWithProviders, NgModule } from '@angular/core'
import { CoreDashboardGridModule } from './components/grid/grid.component'
import { DASHBOARD_WIDGETS } from './constants/dashboard-widgets'
import { DashboardWidget } from './interfaces/dashboard-widget'

@NgModule({
  imports: [CoreDashboardGridModule],
  exports: [CoreDashboardGridModule],
})
export class CoreDashboardModule {
  static forChild(dashboardWidgets: DashboardWidget[]): ModuleWithProviders<CoreDashboardModule> {
    const providers = dashboardWidgets.map((dashboardWidget) => ({
      provide: DASHBOARD_WIDGETS,
      useValue: dashboardWidget,
      multi: true,
    }))

    return { ngModule: CoreDashboardModule, providers }
  }
}
