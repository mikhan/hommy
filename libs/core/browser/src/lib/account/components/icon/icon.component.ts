import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AvatarComponentModule } from '@decet/kendu-browser'

@Component({
  selector: 'core-account-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreAccountIconComponent {}

@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatTooltipModule, AvatarComponentModule],
  declarations: [CoreAccountIconComponent],
  exports: [CoreAccountIconComponent],
})
export class CoreAccountIconComponentModule {}
