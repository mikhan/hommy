import { Directive, NgModule } from '@angular/core'

@Directive({
  selector: '[kdGridSpan]',
})
export class GridSpanDirective {
  // @Input()
  // public set kdGridSpan(properties: Record<string, string>) {
  // this.elementOrRef.nativeElement.style.setProperty('--span', value)
  // }
  // private cssProperties = new CSSProperties(this.elementOrRef)
  // constructor(private elementOrRef: ElementRef<HTMLElement>) {}
}

@NgModule({
  imports: [],
  declarations: [GridSpanDirective],
  exports: [GridSpanDirective],
})
export class GridSpanDirectiveModule {}
