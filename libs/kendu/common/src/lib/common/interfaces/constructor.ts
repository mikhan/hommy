export interface Constructor<T extends {} = {}> extends Function {
  new (...args: any[]): T
}
