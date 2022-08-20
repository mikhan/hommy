import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'
import { DTO } from './dto'

class ClassB extends DTO {
  @IsString() string!: string
}

class ClassA extends DTO {
  @IsString()
  string!: string

  @ValidateNested()
  @Type(() => ClassB)
  object!: ClassB

  @ValidateNested()
  @Type(() => ClassB)
  array!: ClassB[]
}

describe(`DTO testing`, () => {
  it('should create instance of DTO from plain object', () => {
    expect.assertions(3)
    const data = ClassA.from({
      string: 'string',
      object: ClassB.from({ string: 'string', boolean: true, number: undefined }),
      array: [ClassB.from({ string: 'string', boolean: true, number: undefined })],
    })

    expect(data.constructor).toBe(ClassA)
    expect(data.object.constructor).toBe(ClassB)
    data.array.forEach((object) => expect(object.constructor).toBe(ClassB))
  })
})
