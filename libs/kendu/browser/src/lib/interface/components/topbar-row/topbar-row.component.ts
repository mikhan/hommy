import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core'

@Component({
  selector: 'kd-topbar-row',
  templateUrl: './topbar-row.component.html',
  styleUrls: ['./topbar-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarRowComponent {}

@NgModule({
  imports: [],
  declarations: [TopbarRowComponent],
  exports: [TopbarRowComponent],
})
export class TopbarRowComponentModule {}
