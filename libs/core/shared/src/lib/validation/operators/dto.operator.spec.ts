import { Type } from 'class-transformer'
import { IsDate, IsInstance, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { lastValueFrom, Observable, of } from 'rxjs'
import { DTO } from '../classes/dto'
import { ValidationException } from '../types/validation-exception'
import { dto } from './dto.operator'

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

async function asPromise<T>(source: T, operator: (source: Observable<T>) => Observable<T>): Promise<T> {
  return lastValueFrom(of(source).pipe(operator))
}

describe(`dto operator testing`, () => {
  it('should transform and validate the observable plain object', async () => {
    expect.assertions(1)

    const data: unknown = {
      title: 'string',
      author: { id: 1 },
      tags: [{ name: 'tagname' }],
      createdAt: new Date().toString(),
    }

    await expect(asPromise(data as Post, dto(Post))).resolves.toBeInstanceOf(Post)
  })

  it('should throw while validating the observable plain object', async () => {
    expect.assertions(1)
    const data = {}

    await expect(asPromise(data as Post, dto(Post))).rejects.toThrow(ValidationException)
  })
})
