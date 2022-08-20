export interface Callback<T = any, A extends any[] = any[]> {
  (...args: A): T
}

export interface VoidCallback<A extends any[] = any[]> {
  (...args: A): void
}

export interface AsyncCallback<T, A extends any[] = any[]> {
  (...args: A): Promise<T>
}
