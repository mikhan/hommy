import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { FilesystemService } from '../../filesystem/services/filesystem.service'
import { TempFilesystemService } from '../../filesystem/services/temp-filesystem.service'
import { StorageService } from './storage.service'

@Injectable()
export class StorageManagerService {
  private storages = new Map<string, StorageService>()

  constructor(
    private filesystemService: FilesystemService,
    private tempFilesystemService: TempFilesystemService,
    private httpService: HttpService,
  ) {}

  public async getStorage(bucket: string): Promise<StorageService> {
    let storage = this.storages.get(bucket)

    if (!storage) {
      storage = this.createStorage(bucket)
      this.storages.set(bucket, storage)
    }

    return storage
  }

  private createStorage(bucket: string): StorageService {
    const filesystemService = this.filesystemService
    const tempFilesystemService = this.tempFilesystemService
    const httpService = this.httpService

    class Storage extends StorageService {
      bucket = bucket
      filesystemService = filesystemService
      tempFilesystemService = tempFilesystemService
      httpService = httpService
    }

    return new Storage()
  }
}
