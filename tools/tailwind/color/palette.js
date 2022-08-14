const { colorWithOpacityValue } = require('../util/colorWithOpacityValue.js')

const steps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]

/**
 * @param {string} name
 * @returns {Object.<string, Object.<string, string>>}
 */
function createColorPalette(name) {
  const entries = steps
    .map((step) => [[step, colorWithOpacityValue(`--${name}-${step}-bg`)]])
    .flat()

  return { [name]: Object.fromEntries(entries) }
}

module.exports = { createColorPalette }
