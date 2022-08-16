export type OneOrMany<T, V> = T extends Array<any> ? V[] : V
