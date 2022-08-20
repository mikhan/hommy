import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core'

@Component({
  selector: 'kd-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {}

@NgModule({
  imports: [],
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
})
export class TopbarComponentModule {}
