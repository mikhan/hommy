const plugin = require('tailwindcss/plugin')

function stackPlugin() {
  return function ({ addComponents }) {
    addComponents({
      '.stack': {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateRows: 'minmax(0,1fr)',
        gridTemplateAreas: '"stackarea"',
        width: '100%',
        height: '100%',
        ['& > *']: {
          gridArea: 'stackarea',
          zIndex: '0',
        },
      },
    })
  }
}

// @ts-ignore
module.exports = { stack: plugin.withOptions(stackPlugin) }
