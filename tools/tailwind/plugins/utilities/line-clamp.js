const plugin = require('tailwindcss/plugin')

function lineClampPlugin() {
  return function ({ addUtilities }) {
    const utilities = {}
    for (let i = 1; i <= 6; i++) {
      utilities[`.line-clamp-${i}`] = {
        'overflow': 'hidden',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': String(i),
      }
    }

    utilities['.line-clamp-none'] = { '-webkit-line-clamp': 'unset' }

    addUtilities(utilities)
  }
}

// @ts-ignore
module.exports = { lineClamp: plugin.withOptions(lineClampPlugin) }
