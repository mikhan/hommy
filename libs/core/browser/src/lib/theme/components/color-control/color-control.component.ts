import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'core-theme-color-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-control.component.html',
  styleUrls: ['./color-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorControlComponent {
  @Input()
  value = ''

  @Output()
  valueChange = new EventEmitter<string>()

  get model(): string {
    return this.value
  }

  set model(value: string) {
    this.value = value
    this.valueChange.emit(this.value)
  }
}
