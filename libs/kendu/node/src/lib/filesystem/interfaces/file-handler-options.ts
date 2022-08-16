export interface FileHandlerOptions {
  /**
   * The file name without extension (if any) such as 'index'
   */
  name?: string
  /**
   * Indicates if the content is expected to be displayed as an attachment,
   * that is downloaded and saved locally.
   */
  download?: boolean
}
