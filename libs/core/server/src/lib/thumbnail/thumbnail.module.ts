import { resolve } from 'path'
import { DynamicModule, Module } from '@nestjs/common'
import { FilesystemModule } from '../filesystem/filesystem.module'
import { THUMBNAIL_MODULE_CONFIG } from './constants/thumbnail_module_config'
import { ImageResizeInterceptor } from './interceptors/image-resize.interceptor'
import { ThumbnailModuleOptions } from './interfaces/thumbnail-module-options'
import { ThumbnailManagerService } from './services/thumbnail-manager.service'

@Module({
  providers: [ThumbnailManagerService],
  exports: [ThumbnailManagerService, ImageResizeInterceptor],
})
export class ThumbnailModule {
  static forRoot(config: ThumbnailModuleOptions): DynamicModule {
    const root = resolve(process.cwd(), config.root)
    return {
      module: ThumbnailModule,
      providers: [{ provide: THUMBNAIL_MODULE_CONFIG, useValue: { ...config, root } }],
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: ThumbnailModule,
      imports: [FilesystemModule.forFeature()],
    }
  }
}
