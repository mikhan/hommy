import { Type } from 'class-transformer'
import { IsNumber, IsString, IsNotEmpty, ValidateNested, IsInstance, IsDate } from 'class-validator'
import { ObjectType } from '../../common/interfaces/object-type'
import { DTO } from '../classes/dto'
import { ValidationException } from '../types/validation-exception'
import { instanceFromObject } from './transform'
import { validateInstance, validateObject } from './validate'

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

describe(`validateDTO testing`, () => {
  it('should validate DTO instance', () => {
    expect.assertions(1)
    const data = createDTO()

    expect(validateInstance(data)).toStrictEqual(data)
  })

  it('should throw while validating DTO instance', () => {
    expect.assertions(1)
    const data = new Post()

    expect(() => validateInstance(data)).toThrow(ValidationException)
  })
})

describe(`validateObject testing`, () => {
  it('should validate plain object', () => {
    expect.assertions(1)
    const data = createObject()

    expect(validateObject(data, Post)).toStrictEqual(data)
  })

  it('should throw while validating plain object', () => {
    expect.assertions(1)
    const data = {} as ObjectType<Post>

    expect(() => validateObject(data, Post)).toThrow(ValidationException)
  })
})
