const colors = require('tailwindcss/colors')
const {
  aspectRatioComponent,
  typographyComponent,
  lineClampUtility,
  firefoxVariant,
  typography,
} = require('../plugins')

const colorShades = ['-lighter', '-light', '', '-dark', '-darkest']

/**
 * @param {string} name
 * @param {string} oVar
 * @param {string} oVal
 * @returns {string}
 */
function defineColor(name, oVar, oVal) {
  const color = `var(--color-${name})`
  const opacity = oVal ?? (oVar && `var(${oVar}, 1)`) ?? 1

  return `rgba(${color}, ${opacity})`
}

/**
 * @typedef {(options: { opacityVariable: string; opacityValue: string; }) => string} ColorFunction
 */

/**
 *
 * @param {string} name
 * @returns {Object.<string, ColorFunction>}
 */
function createColor(name) {
  return Object.fromEntries(
    colorShades.map((shade) => [
      name + shade,
      ({ opacityVariable, opacityValue }) =>
        defineColor(name + shade, opacityVariable, opacityValue),
    ]),
  )
}

/**
 *
 * @param  {string[]} names
 * @returns {Object.<string, Object.<string, ColorFunction>>}
 */
function createColors(...names) {
  return names.reduce((obj, name) => ({ ...obj, ...createColor(name) }), {})
}

module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      keyframes: {
        openMenu: {
          '0%': { width: '0' },
          '100%': { width: '22.5rem' },
        },
        closeMenu: {
          '0%': { width: '22.5rem' },
          '100%': { width: '0' },
        },
      },
      animation: {
        openMenu: 'openMenu 250ms ease-in-out',
        closeMenu: 'closeMenu 250ms ease-in-out',
      },
      colors: {
        'inherit': colors['inherit'],
        'current': colors['current'],
        'transparent': colors['transparent'],
        'black': colors['black'],
        'white': colors['white'],
        'slate': colors['slate'],
        'gray': colors['gray'],
        'zinc': colors['zinc'],
        'neutral': colors['neutral'],
        'stone': colors['stone'],
        'red': colors['red'],
        'orange': colors['orange'],
        'amber': colors['amber'],
        'yellow': colors['yellow'],
        'lime': colors['lime'],
        'green': colors['green'],
        'emerald': colors['emerald'],
        'teal': colors['teal'],
        'cyan': colors['cyan'],
        'sky': colors['sky'],
        'blue': colors['blue'],
        'indigo': colors['indigo'],
        'violet': colors['violet'],
        'purple': colors['purple'],
        'fuchsia': colors['fuchsia'],
        'pink': colors['pink'],
        'rose': colors['rose'],
        ...createColors('primary', 'secondary'),
        ...createColors('error', 'warn', 'info', 'success'),
        'very-soft-yellow': '#E4D39B',
        'very-dark-blue': '#052D54',
        'dark-yellow': '#B29830',
        'spaces': '#f2eabe',
        'gris-clasico': '#2C2C2C',
        'azul-pos': '#075386',
        'azul-obscuro-pos': '#043656',
        'gris': '#A5A5A5',
        'gris-obscuro': '#666666',
        'gris-claro': '#eeeeee',
        'verde': '#279618',
        'verde-obscuro': '#206916',
        'indigo-lighter': '#b3bcf5',
        'indigo-dark': '#202e78',
      },
      backgroundColor: (/** @type {(theme: string) => Object} */ theme) => ({
        ...theme('colors'),
      }),
      minHeight: {
        '100': '25rem',
        '50vh': '50vh',
        '70vh': '70vh',
        'screen': '100vh',
      },
      maxHeight: {
        '40vh': '40vh',
        '70vh': '70vh',
        '75vh': '75vh',
        'screen': '100vh',
      },
      height: {
        'fit-content': 'fit-content',
      },
      width: {
        'fit-content': 'fit-content',
      },
      spacing: {
        '90': '22.5rem',
        '10vw': '10vw',
        '15vw': '15vw',
        '20vw': '20vw',
        '25vw': '25vw',
        '30vw': '30vw',
        '35vw': '35vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
        // VH
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '35vh': '35vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
      },
      backgroundImage: () => ({
        'bolsa-principal': "url('/assets/bio.jpg')",
      }),
      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))',
        fill: 'repeat(auto-fill, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))',
        fill: 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    aspectRatioComponent(),
    typographyComponent(),
    lineClampUtility(),
    firefoxVariant(),
    typography(),
  ],
}
