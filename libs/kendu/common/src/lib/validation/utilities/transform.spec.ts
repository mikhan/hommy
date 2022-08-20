import { Type } from 'class-transformer'
import { ObjectType } from '../../common/interfaces/object-type'
import { DTO } from '../classes/dto'
import { instanceFromObject, instanceToObject } from './transform'

const symbol = Symbol('symbol')

class ClassB extends DTO {
  string!: string
  boolean!: boolean
  number!: number | undefined;
  [symbol] = 'symbol'

  fnc1 = (): string => 'fnc1'

  fnc2(): string {
    return 'fnc2'
  }
}

class ClassA extends DTO {
  string!: string
  boolean!: boolean
  number!: number | undefined;
  [symbol] = 'symbol'
  @Type(() => ClassB) object!: ClassB
  @Type(() => ClassB) array!: ClassB[]

  fnc1 = (): string => 'fnc1'

  fnc2(): string {
    return 'fnc2'
  }
}

function createObject(): ObjectType<ClassA> {
  return {
    string: 'string',
    boolean: true,
    number: undefined,
    object: { string: 'string', boolean: true, number: undefined },
    array: [{ string: 'string', boolean: true, number: undefined }],
  }
}

function createDTO(): ClassA {
  return instanceFromObject(ClassA, {
    string: 'string',
    boolean: true,
    number: undefined,
    object: instanceFromObject(ClassB, { string: 'string', boolean: true, number: undefined }),
    array: [instanceFromObject(ClassB, { string: 'string', boolean: true, number: undefined })],
  })
}

describe(`instanceFromObject testing`, () => {
  it('should create instance of DTO from plain object', () => {
    expect.assertions(3)
    const data = createObject()
    const result = instanceFromObject(ClassA, data)

    expect(result.constructor).toBe(ClassA)
    expect(result.object.constructor).toBe(ClassB)
    result.array.forEach((object) => expect(object.constructor).toBe(ClassB))
  })
})

describe(`instanceToObject testing`, () => {
  it('should create plain object from instance of DTO', () => {
    expect.assertions(3)
    const data = createDTO()
    const result = instanceToObject(data) as unknown as ClassA

    for (const item of [result, result.object, ...result.array]) {
      expect(item.constructor).toBe(Object)
    }
  })

  it('should remove not allowed JSON values', () => {
    expect.assertions(15)
    const data = createDTO()
    const result = instanceToObject(data) as unknown as ClassA

    for (const item of [result, result.object, ...result.array]) {
      expect(item.string).toBe('string')
      expect(item.boolean).toBe(true)
      expect(item.number).toBeUndefined()
      expect('fnc2' in item).toBeFalsy()
      expect(symbol in item).toBeFalsy()
    }
  })
})
