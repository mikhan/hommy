import { Type } from 'class-transformer'
import { IsDate, IsInstance, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { lastValueFrom, Observable, of } from 'rxjs'
import { ObjectType } from '../../common/interfaces/object-type'
import { DTO } from '../classes/dto'
import { ValidationException } from '../types/validation-exception'
import { instanceFromObject } from '../utilities/transform'
import { validate } from './validate.operator'

class User extends DTO {
  @IsNumber()
  id!: number
}

class Tag extends DTO {
  @IsString()
  @IsNotEmpty()
  name!: string
}

class Post extends DTO {
  @IsString()
  title!: string

  @ValidateNested()
  @IsInstance(User)
  @Type(() => User)
  author!: User

  @ValidateNested()
  @IsInstance(Tag, { each: true })
  @Type(() => Tag)
  tags!: Tag[]

  @IsDate()
  @Type(() => Date)
  createdAt!: Date
}

function createObject(): ObjectType<Post> {
  return {
    title: 'string',
    author: { id: 1 },
    tags: [{ name: 'tagname' }],
    createdAt: new Date(),
  }
}

function createDTO(): Post {
  return instanceFromObject(Post, {
    title: 'string',
    author: instanceFromObject(User, { id: 1 }),
    tags: [instanceFromObject(Tag, { name: 'tagname' })],
    createdAt: new Date(),
  })
}

async function asPromise<T>(source: T, operator: (source: Observable<T>) => Observable<T>): Promise<T> {
  return lastValueFrom(of(source).pipe(operator))
}

describe(`validate operator testing`, () => {
  it('should validate the observable DTO instance', async () => {
    expect.assertions(1)
    const data = createDTO()

    await expect(asPromise(data, validate())).resolves.toStrictEqual(data)
  })

  it('should throw while validating the observable DTO instance', async () => {
    expect.assertions(1)
    const data = new Post()

    await expect(asPromise(data, validate())).rejects.toThrow(ValidationException)
  })

  it('should validate the observable object', async () => {
    expect.assertions(1)
    const data: any = createObject()

    await expect(asPromise(data, validate(Post))).resolves.toStrictEqual(data)
  })

  it('should throw while validating the observable object', async () => {
    expect.assertions(1)
    const data: any = {}

    await expect(asPromise(data, validate(Post))).rejects.toThrow(ValidationException)
  })
})
