import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core'
import { GridComponentModule, GridItemComponentModule } from '@decet/kendu-browser'
import { WidgetsManagerService } from '../../services/widgets-manager.service'

@Component({
  selector: 'core-dashboard-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreDashboardGridComponent {
  // @ViewChild('templateRef', { static: true, read: ViewContainerRef })
  // templateRef!: ViewContainerRef

  public widgets$ = this.widgetsManagerService.widgets$

  constructor(private widgetsManagerService: WidgetsManagerService) {}

  // ngAfterViewInit() {
  //   this.widgetsManagerService.widgets$.subscribe((widgets) => this.createInstances(widgets))
  // }

  // private createInstances(widgets: DashboardWidget[]) {
  //   for (const widget of widgets) {
  //     const instance = this.templateRef.createComponent(widget.component)
  //   }
  // }
}

@NgModule({
  declarations: [CoreDashboardGridComponent],
  imports: [CommonModule, GridComponentModule, GridItemComponentModule],
  exports: [CoreDashboardGridComponent],
})
export class CoreDashboardGridModule {}
