const { hocus } = require('../plugins/utilities/hocus.js')
const { scrollbar } = require('../plugins/utilities/scrollbar.js')
const { stack } = require('../plugins/components/stack.js')
const { surface } = require('../plugins/components/surface.js')

/**
 * @type {Array<import('tailwindcss/plugin').TailwindPlugin>}
 */
const plugins = [
  hocus({}),
  scrollbar({}),
  stack({}),
  surface({ prefix: 'surface' }),
]

module.exports = { plugins }
