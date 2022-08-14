export type PropertyDecorator = <T extends { constructor: { prototype: unknown } }>(
  target: T,
  propertyKey: string | symbol,
  desc?: PropertyDescriptor,
) => void
