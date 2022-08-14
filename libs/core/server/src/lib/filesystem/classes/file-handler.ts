import { createReadStream, ReadStream } from 'fs'
import { readFile } from 'fs/promises'
import { parse } from 'path'
import { Define, Enumerable, Memoize } from '@decet/core-shared'
import { FileHandlerOptions } from '../interfaces/file-handler-options'
import { getCharset, getSize, getType } from '../utils/file'

@Define()
export class FileHandler {
  /**
   * The file name without extension (if any) such as 'index'
   */
  public name!: string

  /**
   * The file extension (if any) such as '.html'
   */
  public readonly ext: string

  /**
   * The file name including extension (if any) such as 'index.html'
   */
  @Enumerable()
  public get filename(): string {
    return this.name + this.ext
  }

  /**
   * The file size
   */
  @Memoize()
  @Enumerable()
  public get size(): number {
    return getSize(this.source)
  }

  /**
   * The file mime type
   */
  @Memoize()
  @Enumerable()
  public get type(): string {
    return getType(this.ext)
  }

  /**
   * The file charset
   */
  @Memoize()
  @Enumerable()
  public get charset(): string {
    return getCharset(this.type)
  }

  /**
   * Indicates if the content is expected to be displayed as an attachment,
   * that is downloaded and saved locally.
   */
  @Enumerable(false)
  public download: boolean

  /**
   * The full directory path such as '/home/user/dir'
   */
  @Enumerable(false)
  public readonly dir!: string

  /**
   * The full path such as '/home/user/dir/index.html'
   */
  @Enumerable(false)
  public readonly source!: string

  constructor(source: string, options: FileHandlerOptions = {}) {
    const { dir, name, ext } = parse(source)

    this.name = options.name ?? name
    this.ext = ext
    this.download = Boolean(options.download)
    this.dir = dir
    this.source = source
  }

  public get stream(): ReadStream {
    return createReadStream(this.source)
  }

  public async getContent(encoding: BufferEncoding = 'utf-8'): Promise<string> {
    return readFile(this.source, encoding)
  }

  public async getBuffer(): Promise<Buffer> {
    return readFile(this.source)
  }
}
