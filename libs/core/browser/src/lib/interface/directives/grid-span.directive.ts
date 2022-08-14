import { Directive, NgModule } from '@angular/core'

@Directive({
  selector: '[uiGridSpan]',
})
export class UiGridSpanDirective {
  // @Input()
  // public set uiGridSpan(properties: Record<string, string>) {
  // this.elementOrRef.nativeElement.style.setProperty('--span', value)
  // }
  // private cssProperties = new CSSProperties(this.elementOrRef)
  // constructor(private elementOrRef: ElementRef<HTMLElement>) {}
}

@NgModule({
  imports: [],
  declarations: [UiGridSpanDirective],
  exports: [UiGridSpanDirective],
})
export class GridSpanDirectiveModule {}
