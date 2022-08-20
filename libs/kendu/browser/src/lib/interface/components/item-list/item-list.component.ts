import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core'

@Component({
  selector: 'kd-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {}

@NgModule({
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
})
export class ItemListComponentModule {}
