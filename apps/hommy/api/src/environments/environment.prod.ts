import {
  Environment as RootEnvironment,
  EnvironmentMode,
} from '../../../../../environment'

export class Environment extends RootEnvironment {
  static init(overrides?: Partial<Environment>): RootEnvironment {
    return RootEnvironment.init({
      ...process.env,
      ...overrides,
      SERVER_ENVIRONMENT: process.env.NODE_ENV as unknown as EnvironmentMode,
      PRODUCTION: true,
    })
  }
}
