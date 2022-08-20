export class Prefixer {
  private readonly _prefix: string

  constructor(prefix: string, separator = '/') {
    if (prefix === '') throw new Error(`Prefix must be a non empty string.`)

    this._prefix = prefix + separator
  }

  public prefix(value: string): string {
    return this._prefix + value
  }

  public unprefix(value: string): string {
    if (!this.matches(value)) throw new Error(`Value is not prefixed.`)

    return value.slice(this._prefix.length)
  }

  public matches(value: string): boolean {
    return value.startsWith(this._prefix)
  }
}
