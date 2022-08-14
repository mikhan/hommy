import { Renderer2 } from '@angular/core'
import { isNumber, isString, isUndefined } from '@decet/core-shared'

export class GridItemController<T extends HTMLElement> {
  #colspan = 1

  #rowspan = 1

  get colspan() {
    return this.#colspan
  }

  set colspan(colspan: number | 'full' | undefined) {
    this.setArribute('colspan', colspan)
  }

  get rowspan() {
    return this.#rowspan
  }

  set rowspan(rowspan: number | undefined) {
    this.setArribute('rowspan', rowspan)
  }

  constructor(private element: T, private renderer2: Renderer2) {}

  private setArribute(attribute: string, value: number | string | undefined) {
    value = this.parseValue(value)

    if (isUndefined(value)) {
      this.renderer2.removeAttribute(this.element, attribute)
    } else {
      this.renderer2.setAttribute(this.element, attribute, String(value))
    }
  }

  private parseValue(value: number | string | undefined): number | 'full' | undefined {
    if (isNumber(value)) return Math.min(12, Math.max(1, value))
    if (isString(value) && value === 'full') return value
    return
  }
}
