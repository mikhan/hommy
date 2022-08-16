import { NgZone } from '@angular/core'

export function OutsideZone(_target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  if (descriptor.set) {
    descriptor.set = outsideZone(descriptor.set)
  } else if (descriptor.value) {
    descriptor.value = outsideZone(descriptor.value)
  }
}

function outsideZone(method: (...args: any[]) => any) {
  return function (this: object, ...args: any[]) {
    assertsHasNgZone(this)

    return this.ngZone.runOutsideAngular(() => method.call(this, ...args))
  }
}

function assertsHasNgZone(object: any): asserts object is { ngZone: NgZone } {
  if (!('ngZone' in object)) {
    throw new Error(`Class with 'OutsideZone' decorator should have 'ngZone' class property with 'NgZone' class.`)
  }
}
