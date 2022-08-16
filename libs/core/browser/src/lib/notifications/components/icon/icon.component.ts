import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'core-notifications-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreNotificationsIconComponent {
  icon = faBell
}

@NgModule({
  imports: [CommonModule, FontAwesomeModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  declarations: [CoreNotificationsIconComponent],
  exports: [CoreNotificationsIconComponent],
})
export class CoreNotificationsIconComponentModule {}
