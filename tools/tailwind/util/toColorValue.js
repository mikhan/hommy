function toColorValue(maybeFunction) {
  return typeof maybeFunction === 'function' ? maybeFunction({}) : maybeFunction
}

module.exports = { toColorValue }
