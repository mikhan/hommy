import { ParsePathResult } from '../../filesystem/utils/path'

export interface ThumbnailInfo extends ParsePathResult {
  info?: Record<string, unknown>
}
