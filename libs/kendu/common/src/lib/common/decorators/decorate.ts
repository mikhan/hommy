export function Decorate() {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)

        const descriptors = constructorDescriptors.get(constructor)
        if (!descriptors) return

        for (const propertyKey of descriptors.keys()) {
          Object.defineProperty(this, propertyKey, getDescriptor(constructor, propertyKey))
        }
      }
    }
  }
}

type ConstructorDescriptors = WeakMap<object, PropertyDescriptors>

type PropertyDescriptors = Map<string | symbol | number, PropertyDescriptor>

const constructorDescriptors: ConstructorDescriptors = new WeakMap()

export function getDescriptor<T extends { prototype: unknown }>(constructor: T, propertyKey: PropertyKey) {
  return {
    ...Object.getOwnPropertyDescriptor(constructor.prototype, propertyKey),
    ...constructorDescriptors.get(constructor)?.get(propertyKey),
  }
}

export function setDescriptor(constructor: Object, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
  let descriptors: PropertyDescriptors | undefined = constructorDescriptors.get(constructor)

  if (!descriptors) {
    descriptors = new Map()
    constructorDescriptors.set(constructor, descriptors)
  }

  descriptors.set(propertyKey, { ...descriptors.get(propertyKey), ...descriptor })
}
