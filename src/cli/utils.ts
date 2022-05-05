/**
 * Returns true if no program command is specified.
 */
export function isTopLevelCommand(command?: string): boolean {
  return !command || command === 'undefined'
}

/**
 * Returns `true` if parsed argv has a top-level option.
 */
export function isTopLevelOption(
  command?: string,
  optionalArgs: Record<string, unknown> = {}
): boolean {
  const args = Object.keys(optionalArgs)

  return (
    isTopLevelCommand(command) &&
    // hard-coded top-level options
    // @todo refactor later
    !!(args.includes('help') || args.includes('h'))
  )
}

export function expandOptions(options: string[]): string[] {
  const expanded = []

  for (const option of options) {
    expanded.push(...option.split(', '))
  }

  return expanded
}
