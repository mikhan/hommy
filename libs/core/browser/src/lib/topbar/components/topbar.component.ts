import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core'
import { TopbarComponentModule, TopbarRowComponentModule } from '@decet/kendu-browser'
import { CoreAccountIconComponentModule } from '../../account/components/icon/icon.component'
import { CoreNotificationsIconComponentModule } from '../../notifications/components/icon/icon.component'

@Component({
  selector: 'core-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreTopbarComponent {}

@NgModule({
  imports: [
    TopbarComponentModule,
    TopbarRowComponentModule,
    CoreNotificationsIconComponentModule,
    CoreAccountIconComponentModule,
  ],
  declarations: [CoreTopbarComponent],
  exports: [CoreTopbarComponent],
})
export class CoreTopbarComponentModule {}
