import { coerceElement } from '@angular/cdk/coercion'
import { ElementRef } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { isObject } from '@decet/core-shared'

export class CSSCustomPropertiesService {
  private element: HTMLElement
  private properties: Record<string, string> = {}
  private valueChanges = new BehaviorSubject(this.properties)

  public valueChanges$ = this.valueChanges.asObservable()

  constructor(elementOrRef: HTMLElement | ElementRef<HTMLElement>, initialStyle?: object) {
    this.element = coerceElement(elementOrRef)

    if (initialStyle) this.setProperties(initialStyle)
  }

  public set(properties: object): void
  public set(property: string, value: unknown): void
  public set(property: string | object, value?: unknown): void {
    if (isObject(property)) {
      this.setProperties(property)
    } else {
      this.setProperty(property, value)
      this.valueChanges.next(this.properties)
    }
  }

  public valueOf(): Readonly<Record<string, string>> {
    return this.properties
  }

  private setProperty(property: string, value: unknown): void {
    const cssProperty = coerceCSSProperty(property)
    const cssValue = coerceCSSValue(value)

    if (this.properties[cssProperty] === cssValue) return

    if (cssValue) {
      this.element.style.setProperty(cssProperty, cssValue)
      this.properties[cssProperty] = cssValue
    } else {
      this.element.style.removeProperty(cssProperty)
      delete this.properties[cssProperty]
    }
  }

  public setProperties(properties: object): void {
    if (properties === null) return

    for (const property of Object.keys(this.properties)) {
      if (!(property in properties)) this.setProperty(property, null)
    }

    for (const [property, value] of Object.entries(properties)) {
      this.setProperty(property, value)
    }

    this.valueChanges.next(this.properties)
  }
}

function coerceCSSProperty(value: string) {
  return (value.startsWith('--') ? value : '--' + value).replace(/(?=[A-Z])/g, '-').toLowerCase()
}

function coerceCSSValue(value: unknown): string | null {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return null
}
