export interface JSONBackend {
  get(url: string | URL): object | object[] | undefined
  set(url: string | URL, value: object | object[]): void
  has(url: string | URL): boolean
}
