import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NumberInputDragDirectiveModule } from '../../pages/theme/number-input-drag.directive'

interface HSLValue {
  h: number
  s: number
  l: number
}

@Component({
  selector: 'core-theme-hsl-control',
  standalone: true,
  imports: [FormsModule, NumberInputDragDirectiveModule],
  templateUrl: './hsl-control.component.html',
  styleUrls: ['./hsl-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HslControlComponent {
  h = 0
  s = 0
  l = 0

  @Input()
  set value(value: HSLValue) {
    this.h = value.h
    this.s = value.s
    this.l = value.l
  }

  @Output()
  valueChange = new EventEmitter<HSLValue>()

  reset() {
    this.h = 0
    this.s = 0
    this.l = 0
    this.notify()
  }

  notify() {
    const value = { h: this.h, s: this.s, l: this.l }
    this.valueChange.emit(value)
  }
}
