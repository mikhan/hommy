const plugin = require('tailwindcss/plugin')

function hocusPlugin() {
  return function ({ addVariant }) {
    addVariant('hocus', ['&:focus', '&:hover'])
    addVariant('group-hocus', [
      ':merge(.group):focus &',
      ':merge(.group):hover &',
    ])
  }
}

// @ts-ignore
module.exports = { hocus: plugin.withOptions(hocusPlugin) }
