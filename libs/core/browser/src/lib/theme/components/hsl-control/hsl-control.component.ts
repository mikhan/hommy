import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { NumberInputDragDirectiveModule } from '../../pages/theme/number-input-drag.directive'

interface HSLValue {
  h: number
  s: number
  l: number
}

@Component({
  standalone: true,
  selector: 'core-theme-hsl-control',
  templateUrl: './hsl-control.component.html',
  styleUrls: ['./hsl-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NumberInputDragDirectiveModule, FontAwesomeModule],
})
export class HslControlComponent {
  h = 0
  s = 0
  l = 0

  @Input()
  set value(value: HSLValue) {
    this.h = value.h
    this.s = Math.round(value.s * 100)
    this.l = Math.round(value.l * 100)
  }

  @Output()
  valueChange = new EventEmitter<HSLValue>()

  icons = {
    close: faClose,
  }

  reset() {
    this.h = 0
    this.s = 0
    this.l = 0
    this.notify()
  }

  notify() {
    const value = {
      h: this.h,
      s: this.s / 100,
      l: this.l / 100,
    }
    this.valueChange.emit(value)
  }
}
