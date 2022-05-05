import type { CommandName, CommandsOptions, RawOptions } from './types'

/**
 * Program commands.
 */
export const COMMANDS: CommandName[] = ['build', 'lint', 'watch']

/**
 * Ignored options.
 */
export const IGNORED_OPTIONS: RawOptions = ['w', 'watch', 'serve', 'servedir']

/**
 * Build command options.
 */
const BUILDS_OPTIONS: RawOptions = [
  't, types',
  'bundle',
  'define',
  'external',
  'format',
  'loader',
  'minify',
  'outdir',
  'outfile',
  'platform',
  'serve',
  'sourcemap',
  'splitting',
  'target',
  'watch',
  'allow-overwrite',
  'analyze',
  'asset-names',
  'banner',
  'charset',
  'chunk-names',
  'color',
  'drop',
  'entry-names',
  'footer',
  'global-name',
  'ignore-annotations',
  'inject',
  'jsx-factory',
  'jsx-fragment',
  'jsx',
  'keep-names',
  'legal-comments',
  'log-level',
  'log-limit',
  'main-fields',
  'mangle-cache',
  'mangle-props',
  'mangle-quoted',
  'metafile',
  'minify-whitespace',
  'minify-identifiers',
  'minify-syntax',
  'out-extension',
  'outbase',
  'preserve-symlinks',
  'public-path',
  'pure',
  'reserve-props',
  'resolve-extensions',
  'servedir',
  'source-root',
  'sourcefile',
  'sourcemap',
  'sources-content',
  'tree-shaking',
  'tsconfig',
  'version',
  'h, help'
]

/**
 * Lint command options.
 */
const LINT_OPTIONS: RawOptions = [
  't, types',
  'no-eslintrc',
  'c, config',
  'env',
  'ext',
  'global',
  'parser',
  'parser-options Object',
  'resolve-plugins-relative-to',
  'plugin',
  'rule Object',
  'rulesdir',
  'fix',
  'fix-dry-run',
  'fix-type',
  'ignore-path',
  'no-ignore',
  'ignore-pattern',
  'stdin',
  'stdin-filename',
  'quiet',
  'max-warnings',
  'o, output-file',
  'f, format',
  'color',
  'no-color',
  'no-inline-config',
  'report-unused-disable-directives',
  'cache',
  'no-cache',
  'cache-file',
  'cache-location',
  'cache-strategy',
  'init',
  'env-info',
  'no-error-on-unmatched-pattern',
  'exit-on-fatal-error',
  'debug',
  'print-config',
  'v, version',
  'h, help'
]

/**
 * Watch command options.
 */
const WATCH_OPTIONS: RawOptions = [
  'c, command',
  'd, debounce',
  't, throttle',
  's, follow-symlinks',
  'i, ignore',
  'initial',
  'p, polling',
  'poll-interval',
  'poll-interval-binary',
  'verbose',
  'silent',
  'h, help',
  'v, version',
  'h, help'
]

/**
 * Commands options.
 */
export const COMMANDS_OPTIONS: CommandsOptions = {
  build: BUILDS_OPTIONS,
  lint: LINT_OPTIONS,
  watch: WATCH_OPTIONS
}
