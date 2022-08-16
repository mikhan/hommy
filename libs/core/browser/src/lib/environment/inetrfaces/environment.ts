import { ModuleWithProviders, Provider, Type } from '@angular/core'

export interface CoreEnvironment {
  production: boolean
  enviromentModules: Array<Type<any> | ModuleWithProviders<{}> | any[]>
  enviromentProviders: Provider[]
}
