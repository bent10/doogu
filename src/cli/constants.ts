import { chalk } from 'zx'

/**
 * Program name.
 */
export const PROGRAM_NAME = 'doogu'

// Top-level help text.
export const HELP_TEXT = `
  ${PROGRAM_NAME} is a zero-config CLI tool that helps us develop modern JS and TS packages with ease

  Usage:
    ${PROGRAM_NAME} <command> [options]

  Commands:
    build   Builds the project on top of esbuild
    lint    Lints the project on top of eslint
    watch   Watches the project

  Options:
    --help, -h  Prints this help text
`

/**
 * Symbol for error messages.
 */
export const SYMBOL_DANGER = chalk.red('✘')
