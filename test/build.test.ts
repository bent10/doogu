import test from 'ava'
import { $, fs } from 'zx'
import {
  expandFiles,
  getPathsFromResult,
  pathSorter,
  splitter
} from './utils.js'

// configurations
$.verbose = false
const outdir = 'test/fixtures/out'
const outdirPattern = 'test/fixtures/out/**/*.[jt]s'
const results = fs.readJsonSync('test/fixtures/results.json')

test.afterEach.always('reset', async () => {
  // delete output directory
  await fs.remove(outdir)
})

test.serial('default', async t => {
  const result = await $`"./dist/cli/index.js" build --outdir ${outdir}`
  const outfiles = getPathsFromResult(result)

  t.deepEqual(outfiles, results.build)
})

test.serial('types', async t => {
  const result = await $`"./dist/cli/index.js" build --outdir ${outdir} --types`
  const outfiles = getPathsFromResult(result)
  const outdirFiles = await expandFiles(outdirPattern)

  t.deepEqual(outfiles, results.build)
  t.deepEqual(outdirFiles, [...results.build, ...results.types])
})

test.serial('custom types directory', async t => {
  const result =
    await $`"./dist/cli/index.js" build --outdir ${outdir} --types test/fixtures/out`
  const outfiles = getPathsFromResult(result)
  const outdirFiles = await expandFiles(outdirPattern)

  t.deepEqual(outfiles, results.build)
  t.deepEqual(
    outdirFiles,
    [...results.build, ...results.customTypes].sort(pathSorter)
  )
})

test.serial('custom src', async t => {
  const result =
    await $`"./dist/cli/index.js" build src/index.ts src/cli/index.ts --outdir ${outdir}`
  const outfiles = getPathsFromResult(result)

  t.deepEqual(outfiles, results.build)
})

test.serial('no-bundle', async t => {
  const result =
    await $`"./dist/cli/index.js" build src --bundle false --outdir ${outdir}`
  const outfiles = getPathsFromResult(result)

  t.deepEqual(outfiles, results.buildNoBundle)
})

test.serial('externals', async t => {
  const result =
    await $`"./dist/cli/index.js" build --outdir ${outdir} --external:yargs-parser`
  const outfiles = getPathsFromResult(result)

  t.deepEqual(outfiles, results.build)
})

test('no files found', async t => {
  const result = await $`"./dist/cli/index.js" build nodir/nofiles`

  t.is(splitter(result.toString()).join(), 'No files found!')
})

test('show helper', async t => {
  const help = await $`"./dist/cli/index.js" build --help`
  const alias = await $`"./dist/cli/index.js" build -h`
  const helper_prefix =
    '\nUsage:\n  doogu build [patterns] [options]\n\nSimple options:\n'

  t.true(help.toString().startsWith(helper_prefix))
  t.true(alias.toString().startsWith(helper_prefix))
})

test('options suggestions', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" build --outDir ${outdir}`, {
    instanceOf: Error,
    message: /Did you mean "--outdir"?/
  })
})

test('unknown options', async t => {
  await t.throwsAsync($`"./dist/cli/index.js" build --foo`, {
    instanceOf: Error,
    message: /Unknown options "--foo"!/
  })
  // unknown alias
  await t.throwsAsync($`"./dist/cli/index.js" build -f`, {
    instanceOf: Error,
    message: /Unknown options "-f"!/
  })
})

test('ignore watch', async t => {
  await t.throwsAsync(
    $`"./dist/cli/index.js" build --outdir ${outdir} --watch`,
    {
      instanceOf: Error,
      message: /Unknown options "--watch"!/
    }
  )
  // watch alias
  await t.throwsAsync($`"./dist/cli/index.js" build --outdir ${outdir} -w`, {
    instanceOf: Error,
    message: /Unknown options "-w"!/
  })
})

test('ignore serve', async t => {
  await t.throwsAsync(
    $`"./dist/cli/index.js" build --outdir ${outdir} --serve 8000`,
    {
      instanceOf: Error,
      message: /Unknown options "--serve"!/
    }
  )
  await t.throwsAsync(
    $`"./dist/cli/index.js" build --outdir ${outdir} --servedir www`,
    {
      instanceOf: Error,
      message: /Unknown options "--servedir"!/
    }
  )
})
