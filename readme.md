# doogu

Zero-config CLI tool that helps us develop modern `JS` and `TS` packages with ease.

<details>
  <summary>Table of contents</summary>
  <ul dir="auto">
    <li><a href="#install">Install</a></li>
    <li><a href="#usage">Usage</a>
    <ul dir="auto">
      <li><a href="#doogu-build---types"><code>doogu build [--types]</code></a></li>
      <li><a href="#doogu-lint---types"><code>doogu lint [--types]</code></a></li>
      <li><a href="#doogu-watch---command"><code>doogu watch [--command]</code></a></li>
    </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#thank-you">Thank you</a></li>
  </ul>
</details>

## Install

```bash
npm i -D doogu
```

**Required** Node.js `>=14.16`.

## Usage

Run `doogu --help` for available commands.

### `doogu build [--types]`

Performs `doogu build [patterns] [options]` command on top of `esbuild`.

```bash
# Bundles "src/**\/index.[jt]s(x)?" into "dist" directory
doogu build

# Bundles "src/**\/index.[jt]s(x)?" and "*.d.ts" files
doogu build --types

# Produces "assets/**\/*.js" and "*.d.ts" files
doogu build "src/**\/*.ts" --outdir=assets --no-bundle --types

# Allow JSX syntax in .js files
doogu build src/component.js --loader:.js=jsx

# Substitute the identifier RELEASE for the literal true
doogu build example.js --outfile=output.js --define:RELEASE=true
```

Run `doogu build --help` for available options.

#### Parameters

| Name           | Type                        | Description                   |
| :------------- | :-------------------------- | :---------------------------- |
| `patterns`     | string \| readonly string[] | File paths or globs to build. |
| `OptionalArgs` | OptionalArgs                | Options to pass to `esbuild`. |

---

### `doogu lint [--types]`

Performs `doogu lint [patterns] [options]` command on top of `eslint`.

```bash
# Lint .js, .jsx, .ts, .tsx files in the "src" and "test" directory
doogu lint

# Run types checking as well
doogu lint --types

# Custom input files and options
doogu lint app --ext=".ts,.tsx" --cache --cache-location=".cache/.eslintcache"
```

Run `doogu lint --help` for available options.

#### Parameters

| Name           | Type                        | Description                   |
| :------------- | :-------------------------- | :---------------------------- |
| `patterns`     | string \| readonly string[] | File paths or globs to build. |
| `OptionalArgs` | OptionalArgs                | Options to pass to `eslint`.  |

---

### `doogu watch [--command]`

Performs `doogu watch [patterns] [options]` command.

```bash
# Automatically rebuild when "src/**\/*" files are changed
doogu watch

# Rebuild when .ts and .scss files are changed
doogu watch "src/**\/*.{ts,scss}"

# Run custom command when input files are changed
doogu watch "src/**\/*.ts" --command="doogu lint"
```

Run `doogu watch --help` for available options

#### Parameters

| Name           | Type                        | Description                       |
| :------------- | :-------------------------- | :-------------------------------- |
| `patterns`     | string \| readonly string[] | File paths or globs to build.     |
| `OptionalArgs` | OptionalArgs                | Options to pass to the `watcher`. |

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## Thank you

A project by [Stilearning](https://stilearning.com) &copy; 2022.
