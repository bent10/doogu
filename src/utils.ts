import { globby } from 'zx'

/**
 * Expands glob patterns in a list of paths.
 */
export async function expandFiles(
  patterns: string | readonly string[]
): Promise<string[]> {
  return await globby(patterns, {
    onlyFiles: true,
    expandDirectories: {
      extensions: ['js', 'jsx', 'ts', 'tsx']
    },
    gitignore: true
  })
}
