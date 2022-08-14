const plugin = require('tailwindcss/plugin')

function scrollbarPlugin() {
  return function ({ addUtilities, theme, matchUtilities }) {
    matchUtilities(
      {
        scrollbar: (value) => {
          const size = value <= 8 ? (value === 0 ? 'none' : 'thin') : 'auto'
          const color = `rgba(255, 255, 255, 0.25)`
          const padding = Math.round(value / 4)
          const borderRadius = Math.round(value / 2)

          return {
            '--scrollbar-gutter': `stable`,
            'scrollbarGutter': 'var(--scrollbar-gutter)',
            'scrollbarWidth': size,
            'scrollbarColor': `${color} transparent`,
            '&::-webkit-scrollbar': {
              width: `${value}px`,
              height: `${value}px`,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
              backgroundClip: 'content-box',
              border: `${padding}px solid transparent`,
              borderRadius: `${borderRadius}px`,
            },
            '&:hover::-webkit-scrollbar-thumb': {
              backgroundColor: color,
            },
          }
        },
      },
      { values: { none: 0, thin: 6, DEFAULT: 12, ...theme('scrollbarSize') } },
    )

    addUtilities({
      '.scrollbar-both-edges': {
        '--scrollbar-gutter': 'stable both-edges',
      },
    })
  }
}

// @ts-ignore
module.exports = { scrollbar: plugin.withOptions(scrollbarPlugin) }
