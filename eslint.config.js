import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

/**
 * @type {import('typescript-eslint').ConfigWithExtends}
 */
const customConfig = {
  ignores: ['**/coverage', '**/dist', '**/vendor']
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  customConfig
)
