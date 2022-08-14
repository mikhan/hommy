import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'

export interface FileModelCreate {
  id: string
  workspaceId: number
  bucket: string
  name: string
  ext: string
  size: number
  hash: string
}

@Table({
  modelName: 'file',
  timestamps: false,
  freezeTableName: true,
})
export class FileModel extends Model<FileModelCreate> {
  @PrimaryKey
  @Column({ type: DataType.STRING(26), allowNull: false })
  declare id: string

  @Column({ type: DataType.INTEGER({ unsigned: true }), allowNull: false })
  workspaceId!: number

  @Column({ type: DataType.TEXT(), allowNull: false })
  bucket!: string

  get filename(): string {
    return this.name + this.ext
  }

  get localFilename(): string {
    return this.id + this.ext
  }

  /**
   * Original name without extension
   */
  @Column({ type: DataType.STRING(260), allowNull: false })
  name!: string

  @Column({ type: DataType.STRING(260), allowNull: false })
  ext!: string

  @Column({ type: DataType.INTEGER({ unsigned: true }), allowNull: false })
  size!: number

  @Column({ type: DataType.TEXT, defaultValue: '', allowNull: false })
  tags!: string

  @Column({ type: DataType.STRING(64), defaultValue: '', allowNull: false })
  hash!: string

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: false })
  readonly createDate!: Date

  @Column({ type: DataType.DATE, defaultValue: null, allowNull: true })
  readonly deleteDate!: Date | null
}
