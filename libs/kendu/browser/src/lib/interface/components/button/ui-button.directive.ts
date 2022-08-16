import { CommonModule } from '@angular/common'
import { Directive, ElementRef, HostBinding, NgModule, Renderer2 } from '@angular/core'

@Directive({
  selector: '[uiType]',
})
export class UiButtonDirective {
  @HostBinding('mat-raised-button')
  matBotton = true

  @HostBinding('test')
  test = true

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    const el = elementRef.nativeElement

    renderer.addClass(el, 'mat-focus-indicator')
    renderer.addClass(el, 'mat-raised-button')
    renderer.addClass(el, 'mat-button-base')
    renderer.addClass(el, 'mat-accent')
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [UiButtonDirective],
  exports: [UiButtonDirective],
})
export class UiButtonDirectiveModule {}
