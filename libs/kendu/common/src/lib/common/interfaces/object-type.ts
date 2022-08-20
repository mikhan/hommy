export type ArrayLike<T> = Array<T> | Set<T>
type ObjectKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K extends symbol ? never : K }[keyof T]
export type ExtractData<T> = T extends object ? { [P in ObjectKeys<T>]?: ObjectType<T[P]> } : T
export type ObjectType<T> = T extends ArrayLike<infer A> ? Array<ObjectType<A>> : ExtractData<T>
