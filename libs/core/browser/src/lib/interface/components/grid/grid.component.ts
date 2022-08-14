import { CommonModule } from '@angular/common'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
} from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Subscription } from 'rxjs'
import { CSSPropsDirectiveModule } from '../../directives/css-properties.directive'
import { CSSCustomPropertiesService } from '../../services/css-custom-properties.service'
import { ResizeObserveService } from '../../services/resize-observe.service'

@Component({
  selector: 'ui-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements AfterContentInit, OnDestroy {
  @Input()
  public set colSize(value: string | string[]) {
    const values = Array.isArray(value) ? value : value.trim().split(/ +/)
    if (values.length === 0) return

    this.cssProperties.set('colMinSize', values[0])
    this.cssProperties.set('colMaxSize', values[1] || values[0])
  }

  @Input()
  public set rowSize(value: string | string[]) {
    const values = Array.isArray(value) ? value : value.trim().split(/ +/)
    if (values.length === 0) return

    this.cssProperties.set('rowMinSize', values[0])
    this.cssProperties.set('rowMaxSize', values[1] || values[0])
  }

  @Input() public set gap(value: string | string[]) {
    const values = Array.isArray(value) ? value : value.trim().split(/ +/)
    if (values.length === 0) return

    this.cssProperties.set('colGap', values[0])
    this.cssProperties.set('rowGap', values[1] || values[0])
  }

  @Input() public set align(value: string) {
    this.cssProperties.set('alignContent', value)
  }

  @Input() public set justify(value: string) {
    this.cssProperties.set('justifyContent', value)
  }

  @Input() public set adjust(value: 'fit' | 'fill') {
    this.cssProperties.set('adjustColumn', `auto-${value}`)
  }

  private subscription: Subscription | null = null

  public cssProperties = new CSSCustomPropertiesService(this.elementRef)

  constructor(private elementRef: ElementRef, private resizeObserverService: ResizeObserveService) {}

  ngAfterContentInit() {
    this.subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

  private subscribe() {
    if (this.subscription) return

    this.subscription = this.resizeObserverService.observe(this.elementRef).subscribe(([{ target, contentRect }]) => {
      const columns = window
        .getComputedStyle(target)
        .getPropertyValue('grid-template-columns')
        .split(' ')
        .map((v) => parseInt(v))
        .filter((v) => v > 0).length

      this.cssProperties.set('layoutWidth', contentRect.width + 'px')
      this.cssProperties.set('layoutHeight', contentRect.height + 'px')
      this.cssProperties.set('layoutColumns', columns)
    })
  }

  private unsubscribe() {
    if (!this.subscription) return

    this.subscription.unsubscribe()
  }
}

@NgModule({
  imports: [CommonModule, CSSPropsDirectiveModule, MatMenuModule, MatCardModule, MatGridListModule, MatIconModule],
  declarations: [GridComponent],
  exports: [GridComponent],
})
export class GridComponentModule {}
