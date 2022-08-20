import { setDescriptor } from './decorate'

type Properties = Map<string | symbol, unknown>

const propertiesCache = new WeakMap<Object, Properties>()

function getProperties(target: Object): Properties {
  if (!propertiesCache.has(target)) {
    propertiesCache.set(target, new Map())
  }

  return propertiesCache.get(target) as Properties
}

export function Coerce<T>(coerce: (value: any) => T) {
  return function (target: Object, propertyKey: string | symbol) {
    const properties = getProperties(target)

    setDescriptor(target.constructor, propertyKey, {
      get() {
        return properties.get(propertyKey)
      },
      set(value) {
        properties.set(propertyKey, coerce(value))
      },
    })
  }
}
