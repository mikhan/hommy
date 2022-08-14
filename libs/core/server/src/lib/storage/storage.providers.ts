import { Provider } from '@nestjs/common'
import { prefixesForStorages } from './decorators/storage.decorator'
import { StorageManagerService } from './services/storage-manager.service'
import { StorageService } from './services/storage.service'

function storageFactory(storageManager: StorageManagerService, bucket: string): Promise<StorageService> {
  return storageManager.getStorage(bucket)
}

function createStorageProvider(provide: string, config: { bucket: string }): Provider<Promise<StorageService>> {
  return {
    provide: provide,
    useFactory: async (storageManager: StorageManagerService) => await storageFactory(storageManager, config.bucket),
    inject: [StorageManagerService],
  }
}

export function createStorageProviders(): Array<Provider<Promise<StorageService>>> {
  return Object.entries(prefixesForStorages).map(([provide, config]) => createStorageProvider(provide, config))
}
