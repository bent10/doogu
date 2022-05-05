import { didYouMean } from 'find-similar'
import { PROGRAM_NAME, SYMBOL_DANGER } from './constants.js'
import {
  COMMANDS,
  COMMANDS_OPTIONS,
  IGNORED_OPTIONS,
  getFlagFromAlias,
  isAliasLike,
  type CommandName
} from '../index.js'
import { expandOptions } from './utils.js'

/**
 * Asserts command from argv.
 */
export function assertCommand(command?: CommandName | 'undefined') {
  if (!command || command === 'undefined') {
    console.log()
    console.error(
      `${PROGRAM_NAME} command is required!\n\n` +
        `Run "${PROGRAM_NAME} --help" for available commands.`
    )
    console.log()
    process.exit(1)
  } else {
    if (!COMMANDS.includes(command)) {
      const suggestCommand = didYouMean(command, COMMANDS)

      console.log()
      console.error(SYMBOL_DANGER, `Unknown command "${command}"!`)
      suggestCommand && console.error(suggestCommand)
      console.log()
      process.exit(1)
    }
  }
}

/**
 * Asserts ignored options from being used as an command option.
 */
export function assertIgnoredOptions(
  optionalArgs: Record<string, unknown> = {}
) {
  const args = Object.keys(optionalArgs)

  for (const argName of args) {
    const flag = isAliasLike(argName) ? '-' + argName : '--' + argName

    if (IGNORED_OPTIONS.includes(argName)) {
      console.log()
      console.error(SYMBOL_DANGER, `Unknown options "${flag}"!`)

      if (/watch|w/.test(argName)) {
        console.info(`Please use "${PROGRAM_NAME} watch" instead.`)
      }
      console.log()

      // exit process immediately
      process.exit(1)
    }
  }
}

/**
 * Asserts options from argv.
 */
export function assertOptions(
  command: CommandName,
  optionalArgs: Record<string, unknown> = {}
) {
  const args = Object.keys(optionalArgs)
  const expandedOptions = expandOptions(COMMANDS_OPTIONS[command])

  for (const arg of args) {
    const argName = getFlagFromAlias(command, arg).replace('--', '')
    const flag = isAliasLike(argName) ? '-' + argName : '--' + argName

    // special case for esbuild (pure, out-extension, inject, footer, banner, loader, external, define)
    if (
      /^(pure|out-extension|inject|footer|banner|loader|external|define):/.test(
        argName
      )
    ) {
      continue
    }

    if (!expandedOptions.includes(argName)) {
      const suggestOpts = didYouMean(argName, expandedOptions, {
        prefix: '--'
      })

      console.log()
      console.error(SYMBOL_DANGER, `Unknown options "${flag}"!`)
      suggestOpts && console.error(suggestOpts)
      console.log()

      // exit process immediately
      process.exit(1)
    }
  }
}
