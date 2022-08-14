module.exports = {
  name: 'auth-app',
  exposes: {
    './Module': 'apps/auth/app/src/app/remote-entry/entry.module.ts',
  },
}
