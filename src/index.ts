/**
 * Zero-config CLI tool that helps us develop modern `JS` and `TS` packages with ease.
 *
 * ## Install
 *
 * ```bash
 * npm i -D doogu
 * ```
 *
 * **Required** Node.js `>=12`.
 *
 * ## Usage
 *
 * Run `doogu --help` for available commands.
 *
 * @module
 */

export * from './types.js'
export * from './constants.js'
export * from './flags.js'
export { runBuild } from './build.js'
export { runLint } from './lint.js'
export { runWatch } from './watch.js'
