import test from 'ava'
import { $, fs } from 'zx'

// configurations
$.verbose = false

test.before(() => {
  // create foo.js
  fs.writeFileSync('test/fixtures/foo.js', 'console.log("foo")')
})

test.after(() => {
  // remove foo.js
  fs.unlinkSync('test/fixtures/foo.js')
})

test.serial('watcher', async t => {
  setTimeout(() => {
    fs.writeFileSync('test/fixtures/foo.js', `// ${new Date().toString()}`)
  }, 3000)
  const command = 'echo 1'
  const result = $`"./dist/cli/index.js" watch test/fixtures/foo.js -c ${command}`

  for await (const chunk of result.stdout) {
    t.is(String(chunk).trim(), 'change:test/fixtures/foo.js')
    break
  }

  result.kill('SIGINT')
})

test.serial('no files found', async t => {
  const result = $`"./dist/cli/index.js" watch nodir/nofiles`

  for await (const chunk of result.stdout) {
    t.is(String(chunk).trim(), 'No files to watch!')
    break
  }

  result.kill('SIGINT')
})

test('show helper', async t => {
  const help = await $`"./dist/cli/index.js" watch --help`
  const alias = await $`"./dist/cli/index.js" watch -h`
  const helper_prefix =
    '\nUsage:\n  doogu watch [patterns] [options]\n\nOptions:\n'

  t.true(help.toString().startsWith(helper_prefix))
  t.true(alias.toString().startsWith(helper_prefix))
})

test('alias options', async t => {
  const result = await $`"./dist/cli/index.js" watch -v`

  t.truthy(result.toString())
})

test('options suggestions', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" watch --poll`, {
    instanceOf: Error,
    message: /Did you mean "--polling"?/
  })
})

test('unknown options', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" watch --bar`, {
    instanceOf: Error,
    message: /Unknown options "--bar"!/
  })
  // unknown alias
  await t.throwsAsync($`"./dist/cli/index.js" watch -b`, {
    instanceOf: Error,
    message: /Unknown options "-b"!/
  })
})
