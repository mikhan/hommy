import { Directive, Input, ElementRef, NgModule } from '@angular/core'
import { CSSCustomPropertiesService } from '../services/css-custom-properties.service'

@Directive({
  selector: '[uiCSSProps]',
})
export class UiCSSPropsDirective {
  @Input()
  public set uiCSSProps(properties: Record<string, string>) {
    this.cssProperties.set(properties)
  }

  private cssProperties = new CSSCustomPropertiesService(this.elementOrRef)

  constructor(private elementOrRef: ElementRef<HTMLElement>) {}
}

@NgModule({
  imports: [],
  declarations: [UiCSSPropsDirective],
  exports: [UiCSSPropsDirective],
})
export class CSSPropsDirectiveModule {}
