module.exports = {
  name: 'hommy-app',
  exposes: {
    './Module': 'apps/hommy/app/src/app/remote-entry/entry.module.ts',
  },
}
