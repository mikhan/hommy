import { AvifOptions, WebpOptions, PngOptions, JpegOptions } from 'sharp'

export type TransformFormat =
  | { type: 'avif'; options?: AvifOptions }
  | { type: 'webp'; options?: WebpOptions }
  | { type: 'png'; options?: PngOptions }
  | { type: 'jpg' | 'jpeg'; options?: JpegOptions }

export type TransformResize = { type: 'scale'; width: number } | { type: 'square'; width: number }

export interface ImageTransformOptions {
  resize?: TransformResize
  format?: TransformFormat
}
