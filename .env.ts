import { plainToClass } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  validateSync,
  ValidationError,
} from 'class-validator'

const pathPrefixRegexp = /^$|^\/[a-zA-Z0-9.-_~!$&'()*+,;=:@]+[^/]$/
const connectionUrl =
  /^\w+:\/\/(?:[^:]+:.*?@)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})?(?::\d{1,5})?(?:\/|$)/
const SERVER_ENVIRONMENT = [
  'development',
  'test',
  'staging',
  'production',
] as const

class Environment {
  /**
   * Path prefix for every API GraphQL context requests
   */
  @Matches(pathPrefixRegexp)
  @IsString()
  public readonly API_GRAPHQL_PREFIX!: string

  /**
   * Path prefix for every API HTTP route
   */
  @Matches(pathPrefixRegexp)
  @IsString()
  public readonly API_PREFIX!: string

  /**
   * Path prefix for every API REST context requests
   */
  @Matches(pathPrefixRegexp)
  @IsString()
  public readonly API_REST_PREFIX!: string

  /**
   * Server hostname to listen
   */
  @IsString()
  public readonly API_SERVER_HOSTNAME!: string

  /**
   * Server port to listen
   */
  @Min(0)
  @Max(65535)
  @IsInt()
  @IsNumber()
  public readonly API_SERVER_PORT!: number

  /**
   * Database url connection
   */
  @Matches(connectionUrl)
  @IsString()
  public readonly DATABASE_URL!: string

  /**
   * Log directory
   */
  @IsString()
  public readonly LOG_DIRECTORY!: string

  /**
   * Prefix to append to log files
   */
  @IsString()
  public readonly LOG_PREFIX!: string

  /**
   * Redis url connection
   */
  @Matches(connectionUrl)
  @IsString()
  public readonly REDIS_URL!: string

  /**
   * Production mode
   */
  @IsBoolean()
  public readonly PRODUCTION!: boolean

  /**
   * Server environment
   * One of development | test | staging | production
   */
  @IsIn(SERVER_ENVIRONMENT)
  @IsString()
  public readonly SERVER_ENVIRONMENT!: typeof SERVER_ENVIRONMENT[number]
}

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

let instance: Environment | undefined

export function createEnvironment(
  overrides: Partial<Environment> = {},
): Environment {
  if (instance) {
    throw new Error('Environment has already been initialized.')
  }

  instance = plainToClass(Environment, overrides, {
    enableImplicitConversion: true,
  })

  assertIsValid(instance)

  return instance
}

export function getEnvironment(): Environment {
  assertIsDefined(instance)

  return instance
}

export { type Environment }
