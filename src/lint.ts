import { $, chalk, path } from 'zx'
import type { OptionalArgs } from './types.js'
import { toFlags } from './flags.js'

// configurations
$.verbose = false

const DEFAULT_OPTIONS: Record<string, unknown> = {
  ext: '.js,.jsx,.ts,.tsx',
  cache: true,
  'cache-location': './node_modules/.cache/doogu/.eslintcache',
  'report-unused-disable-directives': true
}

const USAGE = `
${chalk.bold('Usage:')}
  doogu lint [patterns] [options]`

const EXAMPLES = `
${chalk.bold('Examples:')}
  ${chalk.dim(
    '# Lint .js, .jsx, .ts, .tsx files in the "src" and "test" directory'
  )}
  doogu lint

  ${chalk.dim('# Run types checking as well')}
  doogu lint --types

  ${chalk.dim('# Custom input files and options')}
  doogu lint app --ext ".ts" --cache --cache-location ".cache/.eslintcache"
`

/**
 * Turns chokidar help text into doogu help text.
 */
function normalizeHelpText(text: string): string {
  return text
    .replace(/eslint\s(.+|\s+)/m, USAGE)
    .replace(/\n\w+((\s\w+)+)?:\s/gm, match => {
      return chalk.bold(match)
    })
    .concat(EXAMPLES)
}

/**
 * Performs `doogu lint [patterns] [options]` command on top of `eslint`.
 *
 * ```bash
 * # Lint .js, .jsx, .ts, .tsx files in the "src" and "test" directory
 * doogu lint
 *
 * # Run types checking as well
 * doogu lint --types
 *
 * # Custom input files and options
 * doogu lint app --ext=".ts,.tsx" --cache --cache-location=".cache/.eslintcache"
 * ```
 *
 * Run `doogu lint --help` for available options.
 *
 * @param patterns File paths or globs to build.
 * @param OptionalArgs Options to pass to `eslint`.
 */
export async function runLint(
  patterns: string | readonly string[],
  OptionalArgs: OptionalArgs
): Promise<void> {
  // default patterns
  patterns = patterns.length ? patterns : ['src', 'test']
  const { types, ...options } = OptionalArgs

  // run help command
  if (options.help || options.h) {
    const { stdout } = await $`npx eslint --help`

    return console.log(normalizeHelpText(stdout))
  }

  const lintOptions = { ...DEFAULT_OPTIONS, ...options }
  const flags = toFlags('lint', lintOptions)

  // create cache directory
  if (lintOptions.cache) {
    await $`mkdir -p ${path.dirname(lintOptions['cache-location'])}`
  }

  // run lint command
  $.spawn('npx eslint', [...patterns, ...flags.split(' ')], {
    shell: true,
    stdio: 'inherit'
  })

  // run types command, if requested
  if (types) {
    // run types checking
    const { stderr } = await $`npx tsc --noEmit`
    if (stderr) {
      console.error(String(stderr) + '\n')
    }
  }
}
