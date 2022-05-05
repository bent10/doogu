import { COMMANDS_OPTIONS } from './constants.js'
import type { CommandName, OptionalArgs } from './types.js'

/**
 * Returns `true` if the given flag is like a flag alias.
 */
export function isAliasLike(flag: string): boolean {
  return flag.length === 1 && /^[a-zA-Z]$/.test(flag)
}

/**
 * Returns command flag from the given alias.
 *
 * NOTE: the flagName can be a flag alias, that's why we need
 * to map it to the real flag name.
 */
export function getFlagFromAlias(
  command: CommandName,
  flagName: string
): string {
  if (!isAliasLike(flagName)) return `--${flagName}`

  const commandOptions = COMMANDS_OPTIONS[command]

  return commandOptions.reduce((flag, flagRaw) => {
    const [alias, raw] = flagRaw.split(', ')
    if (alias === flagName) return `--${raw}`
    return flag
  }, flagName)
}

/**
 * Turns parsed argv object into a flags string.
 *
 * ```js
 * const { _, '--': populations, ...optionalArgs } = parser(process.argv.slice(2))
 *
 * const flags = toFlags(optionalArgs)
 * // => '--bundle --minify --sourcemap --target="esnext"'
 * ```
 */
export function toFlags(
  command: CommandName,
  optionalArgs: OptionalArgs,
  quoted = true
): string {
  let flags = ''

  for (const [flagName, value] of Object.entries(optionalArgs)) {
    const flag = getFlagFromAlias(command, flagName)

    switch (typeof value) {
      case 'string':
        //! c8 ignore next
        flags += quoted ? `${flag}="${value}" ` : `${flag}=${value} `
        break

      case 'boolean':
        flags += `${flag} `
        break
    }
  }

  return flags
}
