export type Single<T> = T extends Array<infer V> ? V : T
