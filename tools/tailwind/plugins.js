const plugin = require('tailwindcss/plugin')

function firefoxVariant() {
  return plugin(({ addVariant, e, postcss }) => {
    addVariant('firefox', ({ container, separator }) => {
      const isFirefoxRule = postcss.atRule({
        name: '-moz-document',
        params: 'url-prefix()',
      })
      isFirefoxRule.append(container.nodes)
      container.append(isFirefoxRule)
      isFirefoxRule.walkRules((rule) => {
        rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
      })
    })
  })
}

function typography() {
  return plugin(function ({ addUtilities, variants }) {
    const typefaces = {
      base: 'var(--theme-font-base)',
      disp: 'var(--theme-font-display)',
    }

    const weights = {
      light: 300,
      regular: 400,
      medium: 500,
    }

    const cases = {
      sentence: 'none',
      uppercase: 'uppercase',
    }

    const types = {
      'display-2': {
        typeface: 'disp',
        weight: 'light',
        size: 6,
        height: 6,
        spacing: -0.01562,
        case: 'sentence',
        decoration: true,
      },
      'display': {
        typeface: 'disp',
        weight: 'light',
        size: 3.75,
        height: 3.75,
        spacing: -0.00833,
        case: 'sentence',
        decoration: true,
      },
      'headline-2': {
        typeface: 'disp',
        weight: 'regular',
        size: 3,
        height: 3.125,
        spacing: 'normal',
        case: 'sentence',
        decoration: true,
      },
      'headline': {
        typeface: 'disp',
        weight: 'regular',
        size: 2.125,
        height: 2.5,
        spacing: 0.00735,
        case: 'sentence',
        decoration: true,
      },
      'title-2': {
        typeface: 'disp',
        weight: 'regular',
        size: 1.5,
        height: 2,
        spacing: 'normal',
        case: 'sentence',
        decoration: true,
      },
      'title': {
        typeface: 'disp',
        weight: 'medium',
        size: 1.25,
        height: 2,
        spacing: 0.0125,
        case: 'sentence',
        decoration: true,
      },
      'subheading-2': {
        typeface: 'disp',
        weight: 'regular',
        size: 1,
        height: 1.75,
        spacing: 0.00937,
        case: 'sentence',
        decoration: true,
      },
      'subheading-1': {
        typeface: 'disp',
        weight: 'medium',
        size: 0.875,
        height: 1.375,
        spacing: 0.00714,
        case: 'sentence',
        decoration: true,
      },
      'base': {
        typeface: 'base',
        weight: 'regular',
        size: 1,
        height: 1.5,
        spacing: 0.03125,
        case: 'sentence',
        decoration: true,
      },
      'base-sm': {
        typeface: 'base',
        weight: 'regular',
        size: 0.875,
        height: 1.25,
        spacing: 0.01786,
        case: 'sentence',
        decoration: true,
      },
      'caption': {
        typeface: 'base',
        weight: 'regular',
        size: 0.75,
        height: 1.25,
        spacing: 0.03333,
        case: 'sentence',
        decoration: true,
      },
      'button': {
        typeface: 'base',
        weight: 'medium',
        size: 0.875,
        height: 2.25,
        spacing: 0.08929,
        case: 'uppercase',
        decoration: false,
      },
      'overline': {
        typeface: 'base',
        weight: 'regular',
        size: 0.75,
        height: 2,
        spacing: 0.16667,
        case: 'uppercase',
        decoration: false,
      },
    }

    const newUtilities = Object.entries(types).reduce(
      (newUtilities, [name, config]) => {
        return {
          ...newUtilities,
          [`.type-${name}`]: {
            'fontSize': `${config.size}rem`,
            'lineHeight': `${config.height}rem`,
            'fontWeight': weights[config.weight],
            'fontFamily': typefaces[config.typeface],
            'letterSpacing': `${config.spacing}em`,
            'textDecoration': config.decoration ? 'inherit' : 'none',
            'textTransform': cases[config.case],
            '-moz-osx-font-smoothing': 'grayscale',
            '-webkit-font-smoothing': 'antialiased',
          },
        }
      },
      {},
    )

    addUtilities(newUtilities, variants('typeSystem'))
  })
}

module.exports = {
  aspectRatioComponent,
  typographyComponent,
  lineClampUtility,
  firefoxVariant,
  typography,
}
