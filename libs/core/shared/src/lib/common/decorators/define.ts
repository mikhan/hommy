export function Define() {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)

        const descriptors = constructorDescriptors.get(constructor)
        if (!descriptors) return

        for (const propertyKey of descriptors.keys()) {
          Reflect.defineProperty(this, propertyKey, getDescriptor(constructor, propertyKey))
        }
      }
    }
  }
}

const constructorDescriptors = new Map<unknown, Map<string | symbol | number, PropertyDescriptor>>()

export function getDescriptor<T extends { prototype: unknown }>(constructor: T, propertyKey: PropertyKey) {
  return {
    ...Object.getOwnPropertyDescriptor(constructor.prototype, propertyKey),
    ...constructorDescriptors.get(constructor)?.get(propertyKey),
  }
}

export function setDescriptor<T>(constructor: T, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
  let descriptors = constructorDescriptors.get(constructor)
  if (!descriptors) {
    descriptors = new Map()
    constructorDescriptors.set(constructor, descriptors)
  }

  descriptors.set(propertyKey, {
    ...descriptors.get(propertyKey),
    ...descriptor,
  })
}
