import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core'

@Component({
  selector: 'kd-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {}

@NgModule({
  imports: [],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentComponentModule {}
