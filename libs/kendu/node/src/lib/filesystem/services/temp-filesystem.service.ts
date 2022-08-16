import { rmdirSync } from 'fs'
import { mkdtemp, realpath, rmdir } from 'fs/promises'
import { tmpdir } from 'os'
import { sep, join } from 'path'
import { Inject, Injectable } from '@nestjs/common'
import { FILESYSTEM_MODULE_CONFIG } from '../contants/filesystem_module_config'
import { FilesystemModuleConfig } from '../interfaces/filesystem-module-config'

@Injectable()
export class TempFilesystemService {
  public readonly tmpdir: string

  private tmpDirs = new Set<string>()

  constructor(@Inject(FILESYSTEM_MODULE_CONFIG) config: FilesystemModuleConfig) {
    this.tmpdir = config.tmpdir ?? tmpdir()

    process.on('exit', this.exitHandler.bind(null, { cleanup: true }))
    process.on('SIGINT', this.exitHandler.bind(null, { exit: true }))
    process.on('SIGUSR1', this.exitHandler.bind(null, { exit: true }))
    process.on('SIGUSR2', this.exitHandler.bind(null, { exit: true }))
    process.on('uncaughtException', this.exitHandler.bind(null, { exit: true }))
  }

  public async createTmpDir(): Promise<string> {
    const tmpDir = await mkdtemp((await realpath(this.tmpdir)) + sep)
    this.tmpDirs.add(tmpDir)

    return tmpDir
  }

  public async removeTmpDir(tmpDir: string): Promise<string> {
    await rmdir(tmpDir, { recursive: true })
    this.tmpDirs.delete(tmpDir)

    return tmpDir
  }

  public async createTmpFile(): Promise<string> {
    const tmpDir = await this.createTmpDir()

    return join(tmpDir, 'file')
  }

  public async useTmpDir<T>(fn: (file: string) => T | Promise<T>): Promise<T> {
    const tmpDir = await this.createTmpDir()

    try {
      return await fn(tmpDir)
    } finally {
      await rmdir(tmpDir, { recursive: true })
    }
  }

  private exitHandler(options: { exit?: boolean; cleanup?: boolean }): void {
    for (const tmpDir of this.tmpDirs) {
      rmdirSync(tmpDir, { recursive: true })
    }

    if (options.exit) process.exit()
  }
}
