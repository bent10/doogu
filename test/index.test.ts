import test from 'ava'
import { $, fs } from 'zx'

// configurations
$.verbose = false

test('top-level command', async t => {
  await t.throwsAsync($`./dist/cli/index.js`, {
    instanceOf: Error,
    message: /command is required!/
  })
  await t.throwsAsync($`./dist/cli/index.js --foo`, {
    instanceOf: Error,
    message: /command is required!/
  })
})

test('top-level helper', async t => {
  const result = await $`./dist/cli/index.js --help`
  const helper = await fs.readFile('test/fixtures/helper.txt', 'utf8')

  t.is(result.toString(), helper)
})

test('command suggestions', async t => {
  await t.throwsAsync($`./dist/cli/index.js built`, {
    instanceOf: Error,
    message: /Did you mean "build"?/
  })
})

test('unknown commands', async t => {
  await t.throwsAsync($`./dist/cli/index.js foo`, {
    instanceOf: Error,
    message: /Unknown command "foo"!/
  })
})
