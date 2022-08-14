/**
 * @param {string} variable
 * @returns {(variable: { opacityValue: number }) => string}
 */
function colorWithOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = { colorWithOpacityValue }
