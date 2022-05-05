/**
 * Available commands.
 */
export type CommandName = 'build' | 'lint' | 'watch'

/**
 * Options list in `'alias, flag'` format.
 */
export type RawOptions = string[]

/**
 * Options per command.
 */
export type CommandsOptions = {
  [key in CommandName]: RawOptions
}

/**
 * All remaining options of parsed `args`.
 */
export interface OptionalArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [argName: string]: any
}

/**
 * An object representing the parsed value of `args`
 */
export interface Argv extends OptionalArgs {
  /**
   * Non-option arguments
   */
  _: Array<string | number>

  /**
   * Arguments after the end-of-options flag `--`
   */
  '--'?: Array<string | number>
}
