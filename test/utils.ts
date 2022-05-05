import { globby, path, type ProcessOutput } from 'zx'

/**
 * Expands glob patterns in a list of paths.
 */
export async function expandFiles(
  patterns: string | readonly string[]
): Promise<string[]> {
  try {
    return await globby(patterns, {
      onlyFiles: true,
      expandDirectories: {
        extensions: ['js', 'jsx', 'ts', 'tsx']
      },
      gitignore: true
    })
  } catch (err) {
    throw err
  }
}

/**
 * A utility function to sort array of files by their natural folder-tree order.
 */
export function pathSorter(a: string, b: string): 1 | -1 | 0 {
  const dirA = path.dirname(a)
  const dirB = path.dirname(b)
  const nameA = path.basename(a).split('.')
  const nameB = path.basename(b).split('.')

  if (dirA === dirB) {
    // b before a
    if (nameA > nameB) return 1
    // a before b
    if (nameA < nameB) return -1
    // keep original order
    return 0
  }

  // b before a
  if (dirA > dirB) return 1
  // a before b
  return -1
}

export function splitter(str: string): string[] {
  return str
    .split('\n')
    .map(s => s.trim())
    .filter(s => s)
}

export function getPathsFromResult(result: ProcessOutput): string[] {
  return splitter(String(result))
    .map(s => {
      const filepath = s.split(' ')[0]
      return filepath
    })
    .filter(s => s.includes('/'))
    .sort(pathSorter)
}
