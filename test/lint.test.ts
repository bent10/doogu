import test from 'ava'
import { $, fs } from 'zx'

// configurations
$.verbose = false
const cache = 'node_modules/.cache/doogu/.eslintcache'
const customCache = 'test/fixtures/.eslintcache'

test.after('cleanup', async () => {
  // delete cache files
  await Promise.all([await fs.remove(cache), await fs.remove(customCache)])
})

test('default', async t => {
  await $`"./dist/cli/index.js" lint`

  t.true(await fs.pathExists(cache))
})

test('types', async t => {
  await $`"./dist/cli/index.js" lint --types`

  t.true(await fs.pathExists(cache))
})

test('custom src', async t => {
  await $`"./dist/cli/index.js" lint src/index.ts src/cli/index.ts --ext .ts --cache --cache-location ${customCache}`

  t.true(await fs.pathExists(customCache))
})

test('show helper', async t => {
  const help = await $`"./dist/cli/index.js" lint --help`
  const alias = await $`"./dist/cli/index.js" lint -h`
  const helper_prefix =
    '\nUsage:\n  doogu lint [patterns] [options]\n\nBasic configuration:\n'

  t.true(help.toString().startsWith(helper_prefix))
  t.true(alias.toString().startsWith(helper_prefix))
})

test('alias options', async t => {
  const result = await $`"./dist/cli/index.js" lint -v`

  t.truthy(result.toString())
})

test('options suggestions', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" lint --fit-`, {
    instanceOf: Error,
    message: /Did you mean "--fix"?/
  })
})

test('unknown options', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" lint --bar`, {
    instanceOf: Error,
    message: /Unknown options "--bar"!/
  })
  // unknown alias
  await t.throwsAsync($`"./dist/cli/index.js" lint -b`, {
    instanceOf: Error,
    message: /Unknown options "-b"!/
  })
})
