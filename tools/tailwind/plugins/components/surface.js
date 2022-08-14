const plugin = require('tailwindcss/plugin')
const { flattenColorPalette } = require('../../util/flattenColorPalette')

function surfacePlugin(options = { prefix: 'surface' }) {
  return function ({ addComponents, theme }) {
    const colorPalette = flattenColorPalette(theme('surfaces'))
    const background = {}
    const foreground = {}

    for (const [key, value] of Object.entries(colorPalette)) {
      if (key.endsWith('-text')) foreground[key.slice(0, -5)] = value
      else background[key] = value
    }

    const components = {}

    for (const [name, config] of Object.entries(theme('surfaces'))) {
      for (const value of Object.keys(config)) {
        const componentName = `.${options.prefix}-${name}-${value}`
        components[componentName] = {
          '--surface-fg': `rgb(var(--${name}-${value}-fg))`,
          '--surface-bg': `rgb(var(--${name}-${value}-bg))`,
          'color': `var(--surface-fg)`,
          'backgroundColor': `var(--surface-bg)`,
        }
      }
    }

    addComponents(components)
  }
}

// @ts-ignore
module.exports = { surface: plugin.withOptions(surfacePlugin) }
