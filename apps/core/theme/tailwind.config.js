const { extendTailwindConfig } = require('../../../tools/tailwind/config.js')

module.exports = extendTailwindConfig(__filename, {
  theme: {
    extend: {
      // Extend theme
    },
  },
  safelist: [{ pattern: /primary|secondary|neutral/ }],
})
