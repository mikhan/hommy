import { resolve } from 'path'
import { DynamicModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { FILESYSTEM_MODULE_CONFIG } from './contants/filesystem_module_config'
import { FileStreamInterceptor } from './interceptors/file-stream.interceptor'
import { FilesystemModuleConfig } from './interfaces/filesystem-module-config'
import { FilesystemService } from './services/filesystem.service'

@Module({
  providers: [FilesystemService],
  exports: [FilesystemService],
})
export class FilesystemModule {
  static forRoot(options: FilesystemModuleConfig): DynamicModule {
    const root = resolve(process.cwd(), options.root)

    return {
      global: true,
      module: FilesystemModule,
      providers: [
        { provide: FILESYSTEM_MODULE_CONFIG, useValue: { ...options, root } },
        { provide: APP_INTERCEPTOR, useClass: FileStreamInterceptor },
      ],
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: FilesystemModule,
    }
  }
}
