import { ChangeDetectionStrategy, Component, ElementRef, Input, NgModule, Renderer2 } from '@angular/core'
import { GridItemController } from '../../classes/grid-item.controller'

@Component({
  selector: 'kd-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridItemComponent {
  @Input()
  set colspan(colspan: number | 'full' | undefined) {
    this.controller.colspan = colspan
  }

  get colspan() {
    return this.controller.colspan
  }

  @Input()
  set rowspan(rowspan: number | undefined) {
    this.controller.rowspan = rowspan
  }

  get rowspan() {
    return this.controller.rowspan
  }

  private controller: GridItemController<HTMLElement>

  constructor(elementRef: ElementRef, renderer2: Renderer2) {
    this.controller = new GridItemController<HTMLElement>(elementRef.nativeElement, renderer2)
  }
}

@NgModule({
  declarations: [GridItemComponent],
  exports: [GridItemComponent],
})
export class GridItemComponentModule {}
