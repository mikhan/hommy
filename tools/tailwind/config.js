const { join, dirname } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')

/**
 * @typedef {import('tailwindcss/tailwind-config').TailwindConfig} TailwindConfig
 *
 * Tailwind configuration options.
 * @typedef {Object} Options
 * @property {TailwindConfig['darkMode']} [darkMode]
 * @property {TailwindConfig['important']} [important]
 * @property {TailwindConfig['theme']} [theme]
 * @property {TailwindConfig['safelist']} [safelist]
 *
 *
 */

/**
 * Extend Tailwind configuration.
 * @param  {string | string[]} sourceFile
 * @param  {Options} [config]
 * @returns {any}
 */
function extendTailwindConfig(sourceFile, config) {
  return { ...getTailwindConfig(sourceFile), ...config }
}

/**
 * Get Tailwind configuration.
 * @param  {string | string[]} sourceFile
 * @returns {{content: string[], presets: any[]}}
 */
function getTailwindConfig(sourceFile) {
  let content

  if (typeof sourceFile === 'string') {
    const __dirname = dirname(sourceFile)
    content = [
      join(__dirname, 'src/**/!(*.stories|*.spec).{html,ts,scss}'),
      ...createGlobPatternsForDependencies(__dirname),
    ]
  } else {
    content = sourceFile
    sourceFile = 'root'
  }

  console.log(`Load Tailwind config for ${sourceFile}.`)
  content.forEach((pattern) => console.log(`Watch: ${pattern}`))

  return {
    content,
    presets: [getPreset()],
  }
}

/**
 * Get Tailwind configuration preset.
 * @returns {TailwindConfig}
 */
function getPreset() {
  return {
    darkMode: 'media',
    // important: '#app-root',
    theme: require('./config/theme').theme,
    plugins: require('./config/plugins').plugins,
  }
}

module.exports = { getTailwindConfig, extendTailwindConfig }
