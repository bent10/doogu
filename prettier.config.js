/**
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: ['*.html'],
      options: {
        singleQuote: false,
        htmlWhitespaceSensitivity: 'css'
      }
    },
    {
      files: ['*.scss'],
      options: {
        singleQuote: false
      }
    }
  ]
}
