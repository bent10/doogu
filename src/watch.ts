import { $, chalk } from 'zx'
import type { OptionalArgs } from './types.js'
import { toFlags } from './flags.js'
import { expandFiles } from './utils.js'

// configurations
$.verbose = false

const DEFAULT_OPTIONS: Record<string, unknown> = {
  command: 'npm run build'
}

const USAGE = `
${chalk.bold('Usage:')}
  doogu watch [patterns] [options]

${chalk.bold('Options:')}`

const EXAMPLES = `${chalk.bold('Examples:')}
  ${chalk.dim('# Automatically rebuild when "src/**/*" files are changed')}
  doogu watch

  ${chalk.dim('# Rebuild when .ts and .scss files are changed')}
  doogu watch "src/**/*.{ts,scss}"

  ${chalk.dim('# Runs custom command when input files are changed')}
  doogu watch "src/**/*.ts" --command="doogu lint"
`

/**
 * Turns chokidar help text into doogu help text.
 */
function normalizeHelpText(text: string): string {
  return text
    .replace(/Usage:(.+|\s+){13}/m, USAGE)
    .replace(/Examples\:(.+|\s+){7}/m, EXAMPLES)
}

/**
 * Performs `doogu watch [patterns] [options]` command.
 *
 * ```bash
 * # Automatically rebuild when "src/**\/*" files are changed
 * doogu watch
 *
 * # Rebuild when .ts and .scss files are changed
 * doogu watch "src/**\/*.{ts,scss}"
 *
 * # Run custom command when input files are changed
 * doogu watch "src/**\/*.ts" --command="doogu lint"
 * ```
 *
 * Run `doogu watch --help` for available options.
 *
 * @param patterns File paths or globs to build.
 * @param OptionalArgs Options to pass to the `watcher`.
 *
 * @todo make better logs with chokidar api
 */
export async function runWatch(
  patterns: string | readonly string[],
  OptionalArgs: OptionalArgs
): Promise<void> {
  // default patterns
  patterns = patterns.length ? patterns : ['src/*', 'src/**/*']

  // run help command
  if (OptionalArgs.help || OptionalArgs.h) {
    const { stdout } = await $`npx chokidar --help`

    return console.log(normalizeHelpText(stdout))
  }

  const watchOptions = { ...DEFAULT_OPTIONS, ...OptionalArgs }
  const flags = toFlags('watch', watchOptions)

  // expands `patterns`
  const files = await expandFiles(patterns)
  if (!files.length) {
    return console.log('\nNo files to watch!\n')
  }

  // run watch command
  $.spawn('npx chokidar', [...patterns, ...flags.split(' ')], {
    shell: true,
    stdio: 'inherit'
  })
}
