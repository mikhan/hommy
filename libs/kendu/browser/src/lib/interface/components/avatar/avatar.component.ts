import { Component, ChangeDetectionStrategy, NgModule, Input } from '@angular/core'

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input()
  src: string | null = null
}

@NgModule({
  imports: [],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarComponentModule {}
