export const enum Environment {
  BROWSER,
  SERVER,
  UNKNOWN,
}

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
const isServer = new Function('try {return this===global;}catch(e){return false;}')

export const PLATFORM = isBrowser() ? Environment.BROWSER : isServer() ? Environment.SERVER : Environment.UNKNOWN
