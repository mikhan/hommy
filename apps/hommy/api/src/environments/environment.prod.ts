import { createEnvironment } from 'environment'

export const environment = createEnvironment({
  SERVER_ENVIRONMENT: process.env.NODE_ENV as unknown as EnvMode,
  PRODUCTION: true,
  ...process.env,
})
