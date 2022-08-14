import { Breakpoint } from './breakpoint'

export interface ThumbnailModuleOptions {
  readonly root: string
  readonly breakpoints: ReadonlyArray<Breakpoint>
}
