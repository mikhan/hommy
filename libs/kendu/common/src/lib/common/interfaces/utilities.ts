export type OneOrMany<T, V> = T extends Array<any> ? V[] : V

export type IsDefined<A, B> = A extends undefined ? B : A

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type UnwrapArray<T> = T extends Array<infer V> ? V : T
