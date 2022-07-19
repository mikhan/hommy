import { plainToClass } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
  validateSync,
  ValidationError,
} from 'class-validator'

function assertIsDefined(
  value: Environment | undefined,
): asserts value is Environment {
  if (typeof value === 'undefined') {
    throw new TypeError(`Environment has not been initialized.`)
  }
}

function assertIsValid(
  value: Environment | undefined,
): asserts value is Environment {
  assertIsDefined(value)
  const error = getError(value)

  if (error) {
    const { property, value, constraints } = error
    const messages = [`Invalid Environment value ${property}=${value}.`]

    if (constraints) {
      for (const constraint of Object.values(constraints)) {
        messages.push(`${constraint}.`)
      }
    }

    throw new Error(messages.join(' '))
  }
}

function getError(value: Environment): ValidationError | undefined {
  return validateSync(value, {
    forbidUnknownValues: true,
    skipMissingProperties: false,
    whitelist: true,
  })[0]
}

function createInstance(plain: Partial<Environment>): Environment {
  const base = Environment
  const constructor = class Environment extends base {
    constructor() {
      super()
    }
  }

  return plainToClass(constructor, plain, { enableImplicitConversion: true })
}
function init(overrides?: Partial<Environment>): Environment {
  if (!instance && !overrides) {
    throw new Error('Environment has already been initialized.')
  }

  instance ??= overrides ? createInstance(overrides) : instance
  assertIsValid(instance)

  return instance
}

function getInstance(): Environment {
  assertIsDefined(instance)

  return instance
}

function getValue<T>(): T {
  return undefined as unknown as T
}

export enum EnvironmentMode {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

let instance: Environment | undefined

const apiPathPrefixRegexp = /^$|^\/[^\s]+[^\/]$/

export abstract class Environment {
  /**
   * Path prefix for every API HTTP route
   */
  @Matches(apiPathPrefixRegexp)
  @IsString()
  public readonly API_PREFIX: string = getValue()

  /**
   * Path prefix for every API GraphQL context requests
   */
  @Matches(apiPathPrefixRegexp)
  @IsString()
  public readonly API_GRAPHQL_PREFIX: string = getValue()

  /**
   * Path prefix for every API REST context requests
   */
  @Matches(apiPathPrefixRegexp)
  @IsString()
  public readonly API_REST_PREFIX: string = getValue()

  /**
   * Database url connection
   */
  @IsString()
  public readonly DATABASE_URL: string = getValue()

  /**
   * Production mode
   */
  @IsBoolean()
  public readonly PRODUCTION: boolean = getValue()

  /**
   * Server environment
   * One of development | test | staging | production
   */
  @IsIn(Object.values(EnvironmentMode))
  @IsString()
  public readonly SERVER_ENVIRONMENT: EnvironmentMode = getValue()

  /**
   * Server hostname to listen
   */
  @IsString()
  public readonly SERVER_HOSTNAME: string = getValue()

  /**
   * Server port to listen
   */
  @Min(0)
  @Max(65535)
  @IsInt()
  @IsNumber()
  public readonly SERVER_PORT: number = getValue()

  public static init = init
  public static getInstance = getInstance
  protected constructor() {}
}
