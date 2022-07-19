import { env } from 'node:process'
import {
  Environment as RootEnvironment,
  EnvironmentMode,
} from '../../../../../environment'

export class Environment extends RootEnvironment {
  static init(initial?: Partial<Environment>): RootEnvironment {
    return RootEnvironment.init({
      ...env,
      ...initial,
      SERVER_ENVIRONMENT: process.env.NODE_ENV as unknown as EnvironmentMode,
      PRODUCTION: false,
    })
  }
}
