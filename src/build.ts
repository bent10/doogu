import type { PackageJson } from 'type-fest'
import { $, chalk, path, fs } from 'zx'
import type { OptionalArgs } from './types.js'
import { toFlags } from './flags.js'
import { expandFiles } from './utils.js'

// configurations
$.verbose = false

const DEFAULT_OPTIONS: Record<string, unknown> = {
  bundle: true,
  outdir: './dist',
  platform: 'node',
  target: 'node12.22',
  format: 'esm',
  'legal-comments': 'inline'
}

const USAGE = `${chalk.bold('Usage:')}
  doogu build [patterns] [options]

${chalk.bold('Simple options:')}`

const EXAMPLES = `${chalk.bold('Examples:')}
  ${chalk.dim('# Bundles "src/**/index.[jt]s(x)?" into "dist" directory')}
  doogu build

  ${chalk.dim('# Bundles "src/**/index.[jt]s(x)?" and "*.d.ts" files')}
  doogu build --types

  ${chalk.dim('# Produces "assets/**/*.js" and "*.d.ts" files')}
  doogu build "src/**/*.ts" --outdir=assets --no-bundle --types

  ${chalk.dim('# Allow JSX syntax in .js files')}
  doogu build src/component.js --loader:.js=jsx

  ${chalk.dim('# Substitute the identifier RELEASE for the literal true')}
  doogu build example.js --outfile=output.js --define:RELEASE=true
`

/**
 * Turns esbuild help text into doogu help text.
 */
function normalizeHelpText(text: string): string {
  return text
    .replace(/Usage:(.+|\s+){12}/m, USAGE)
    .replace(/Advanced options:/m, chalk.bold('Advanced options:'))
    .replace(/Examples\:(.+|\s+){25}/m, EXAMPLES)
}

/**
 * Returns externals packages from current project.
 */
function getExternalPackages(): string[] {
  const pkg: PackageJson = fs.readJSONSync(
    path.resolve(process.cwd(), 'package.json'),
    'utf8'
  )
  // current project dependencies
  const externals = [
    'fsevents',
    ...Object.keys(<Record<string, string>>pkg.dependencies || {})
  ]
  // list of packages that came along with zx.
  const extra = [
    'chalk',
    'fs-extra',
    'globby',
    'minimist',
    'node-fetch',
    'ps-tree',
    'which',
    'yaml'
  ]
  /*! c8 ignore next */
  return externals.includes('zx') ? [...externals, ...extra] : externals
}

/**
 * Performs `doogu build [patterns] [options]` command on top of `esbuild`.
 *
 * ```bash
 * # Bundles "src/**\/index.[jt]s(x)?" into "dist" directory
 * doogu build
 *
 * # Bundles "src/**\/index.[jt]s(x)?" and "*.d.ts" files
 * doogu build --types
 *
 * # Produces "assets/**\/*.js" and "*.d.ts" files
 * doogu build "src/**\/*.ts" --outdir=assets --no-bundle --types
 *
 * # Allow JSX syntax in .js files
 * doogu build src/component.js --loader:.js=jsx
 *
 * # Substitute the identifier RELEASE for the literal true
 * doogu build example.js --outfile=output.js --define:RELEASE=true
 * ```
 *
 * Run `doogu build --help` for available options.
 *
 * @param patterns File paths or globs to build.
 * @param OptionalArgs Options to pass to `esbuild`.
 */
export async function runBuild(
  patterns: string | readonly string[],
  OptionalArgs: OptionalArgs
): Promise<void> {
  // default patterns
  patterns = patterns.length ? patterns : ['src/**/index.{js,jsx,ts,tsx}']
  const { types, ...options } = OptionalArgs

  // run help command
  if (options.help || options.h) {
    const { stdout } = await $`npx esbuild --help`

    return console.log(normalizeHelpText(stdout))
  }

  const buildOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  // build flags string
  let flags = toFlags('build', buildOptions)
  // add external packages when --bundle is set
  if (buildOptions.bundle === true && !flags.includes('--external')) {
    // get external packages
    const packages = getExternalPackages()

    // add packages to flags
    for (const pkg of packages) {
      flags += `--external:${pkg} `
    }
  }

  // expands `patterns`
  const files = await expandFiles(patterns)
  if (!files.length) {
    return console.log('\nNo files found!\n')
  }

  // run build command
  const result = $.spawn('npx esbuild', [...files, ...flags.split(' ')], {
    shell: true,
    stdio: 'inherit'
  })
  result.on('close', () => {
    // give a line spacing
    !buildOptions.analyze && console.log()
  })

  // run types command, if requested
  if (types) {
    const typesDir =
      typeof types === 'string'
        ? types
        : path.join(<string>buildOptions.outdir, 'types')
    const tscArgs = [
      '--declaration',
      '--emitDeclarationOnly',
      '--declarationDir',
      typesDir
    ]

    const { stderr } = await $`npx tsc ${tscArgs}`
    if (stderr) {
      console.error(String(stderr) + '\n')
    }
  }
}
