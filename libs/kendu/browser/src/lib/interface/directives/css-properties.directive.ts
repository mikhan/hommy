import { Directive, Input, ElementRef, NgModule } from '@angular/core'
import { CSSCustomPropertiesService } from '../services/css-custom-properties.service'

@Directive({
  selector: '[kdCSSProps]',
})
export class CSSPropsDirective {
  @Input()
  public set kdCSSProps(properties: Record<string, string>) {
    this.cssProperties.set(properties)
  }

  private cssProperties = new CSSCustomPropertiesService(this.elementOrRef)

  constructor(private elementOrRef: ElementRef<HTMLElement>) {}
}

@NgModule({
  imports: [],
  declarations: [CSSPropsDirective],
  exports: [CSSPropsDirective],
})
export class CSSPropsDirectiveModule {}
