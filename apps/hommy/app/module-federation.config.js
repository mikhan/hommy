/**
 * @type {import('@nrwl/angular/src/utils/mf/with-module-federation').MFConfig}
 */
module.exports = {
  name: 'hommy-app',
  exposes: {
    './Module': 'apps/hommy/app/src/app/remote-entry/entry.module.ts',
  },
  shared: (libraryName, sharedConfig) => {
    console.log(libraryName, sharedConfig)

    return sharedConfig
  },
}
