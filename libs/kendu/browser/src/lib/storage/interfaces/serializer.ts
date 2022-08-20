export interface Serializer<T = any> {
  serialize(value: T): string
  unserialize(value: string): T | undefined
}
