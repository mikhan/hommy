enum EnvMode {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

interface Env {
  /**
   * Path prefix for every API GraphQL context requests
   */
  readonly API_GRAPHQL_PREFIX: string

  /**
   * Path prefix for every API HTTP route
   */
  readonly API_PREFIX: string

  /**
   * Path prefix for every API REST context requests
   */
  readonly API_REST_PREFIX: string

  /**
   * Server hostname to listen
   */
  readonly API_SERVER_HOSTNAME: string

  /**
   * Server port to listen
   */
  readonly API_SERVER_PORT: number

  /**
   * Database url connection
   */
  readonly DATABASE_URL: string

  /**
   * Redis url connection
   */
  readonly REDIS_URL: string

  /**
   * Production mode
   */
  readonly PRODUCTION: boolean

  /**
   * Server environment
   * One of development | test | staging | production
   */
  readonly SERVER_ENVIRONMENT: EnvironmentMode
}
