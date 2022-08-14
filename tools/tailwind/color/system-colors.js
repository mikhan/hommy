const systemColorTokens = [
  'canvas',
  'canvasText',
  'linkText',
  'visitedText',
  'activeText',
  'buttonFace',
  'buttonText',
  'buttonBorder',
  'field',
  'fieldText',
  'highlight',
  'highlightText',
  'selectedItem',
  'selectedItemText',
  'mark',
  'markText',
  'grayText',
]

/**
 * @returns {Object<string, string>}
 */
function systemColors() {
  return Object.fromEntries(
    systemColorTokens.map((token) => [
      token,
      `var(--color-${token}, ${token})`,
    ]),
  )
}

module.exports = { systemColors }
