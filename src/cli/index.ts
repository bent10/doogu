#!/usr/bin/env node

import parser from 'yargs-parser'
import {
  type Argv,
  type CommandName,
  runBuild,
  runWatch,
  runLint
} from '../index.js'
import {
  assertCommand,
  assertIgnoredOptions,
  assertOptions
} from './asserts.js'
import { HELP_TEXT } from './constants.js'
import { isTopLevelOption } from './utils.js'

const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  '--': populations,
  _: args,
  ...optionalArgs
}: Argv = parser(process.argv.slice(2), {
  configuration: {
    'camel-case-expansion': false
  }
})
const command = <CommandName>String(args[0])
const patterns: readonly string[] = args.slice(1).map(String)

// intercept top-level command and optionalArgs
if (isTopLevelOption(command, optionalArgs)) {
  console.log(HELP_TEXT)
  process.exit(0)
}

// assertions
assertCommand(command)
assertIgnoredOptions(optionalArgs)
assertOptions(command, optionalArgs)

switch (command) {
  // build command => `doogu build --help`
  case 'build':
    void (async function () {
      await runBuild(patterns, optionalArgs)
    })()
    break
  // lint command => `doogu lint --help`
  case 'lint':
    void (async function () {
      await runLint(patterns, optionalArgs)
    })()
    break
  // watch command => `doogu watch --help`
  case 'watch':
    void (async function () {
      await runWatch(patterns, optionalArgs)
    })()
    break
}
