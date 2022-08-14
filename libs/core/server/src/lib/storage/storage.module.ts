import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { FileModel } from './models/file.model'
import { StorageManagerService } from './services/storage-manager.service'
import { createStorageProviders } from './storage.providers'

@Module({})
export class StorageModule {
  static forFeature(): DynamicModule {
    const storageProviders = createStorageProviders()

    return {
      module: StorageModule,
      imports: [HttpModule],
      providers: [StorageManagerService, ...storageProviders],
      exports: [StorageManagerService, ...storageProviders],
    }
  }

  static forRoot(): DynamicModule {
    const storageProviders = createStorageProviders()

    return {
      module: StorageModule,
      imports: [HttpModule, SequelizeModule.forFeature([FileModel])],
      providers: [StorageManagerService, ...storageProviders],
      exports: [StorageManagerService, ...storageProviders],
    }
  }
}
