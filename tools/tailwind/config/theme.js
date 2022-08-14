const { systemColors } = require('../color/system-colors.js')
const { basicColors } = require('../color/basic-colors.js')
const { createColorPalette } = require('../color/palette.js')

const primaryPalette = createColorPalette('primary')
const secondaryPalette = createColorPalette('secondary')
const neutralPalette = createColorPalette('neutral')

const primaryTextPalette = createColorPalette('primary-text')
const secondaryTextPalette = createColorPalette('secondary-text')
const neutralTextPalette = createColorPalette('neutral-text')

const theme = {
  colors: {
    ...basicColors(),
    ...systemColors(),
    ...primaryPalette,
    ...primaryTextPalette,
    ...secondaryPalette,
    ...secondaryTextPalette,
    ...neutralPalette,
    ...neutralTextPalette,
  },
  surfaces: {
    ...primaryPalette,
    ...secondaryPalette,
    ...neutralPalette,
  },
  fontFamily: {
    sans: [
      'Roboto',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ],
    serif: [
      'ui-serif',
      'Georgia',
      'Cambria',
      'Times New Roman',
      'Times',
      'serif',
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },
  screens: {
    'sm': '600px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
  animation: {
    'fade-in': 'fade-in 150ms ease-in 1',
    'fade-out': 'fade-out 150ms ease-out 1',
  },

  keyframes: {
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    'fade-out': {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
  },
}

module.exports = { theme }
