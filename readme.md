# doogu

A wrapper around modern JavaScript tools.

- [Install](#install)
- [What includes?](#what-includes)
- [Shareable configs](#shareable-configs)
  - [ESLint Configuration](#eslint-configuration)
  - [Prettier Configuration](#prettier-configuration)
  - [Semantic Release Configuration](#semantic-release-configuration)
- [NPM Scripts](#npm-scripts)
- [Contributing](#contributing)
- [Thank you](#thank-you)

## Install

```bash
npm i -D doogu
```

## What includes?

This package comes with a set of essential development dependencies:

- [Typescript](https://www.typescriptlang.org/) – A language for application-scale JavaScript
- [Vite](https://vitejs.dev/) – Next generation frontend tooling
- [Vitest](https://www.npmjs.com/package/chokidar-cli) – A Vite-native unit test framework. It's fast!
- [ESLint](https://eslint.org/) – Pluggable JavaScript linter
- [Prettier](https://prettier.io/) – An opinionated code formatter

## Shareable configs

Doogu provides shareable configs for ESLint, Prettier, and Semantic Release that can be reused across projects.

### ESLint Configuration

To extend the shareable ESLint configuration in your `package.json` file, add the following:

```json
{
  "eslintConfig": {
    "extends": "doogu/eslint"
  }
}
```

### Prettier Configuration

To extend the shareable Prettier configuration in your `package.json` file, add the following:

```json
{
  "prettier": "doogu/prettier.json"
}
```

### Semantic Release Configuration

To extend the shareable Semantic Release config in your `package.json` file, add the following:

```json
{
  "release": "doogu/release.config.js"
}
```

## NPM Scripts

You can utilize the following commands in your `package.json` file:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Or do anything you want:

```json
{
  "scripts": {
    "start": "npm run dev",
    "dev": "npm run types && vite build --ssr src/index.ts --emptyOutDir=false --watch",
    "build": "vite build --ssr src/index.ts && npm run types",
    "test": "vitest --ui",
    "coverage": "vitest run --coverage",
    "types": "tsc -d --emitDeclarationOnly --outDir ./dist && resolve-tspaths -o ./dist",
    "lint": "tsc --noEmit && eslint .",
    "format": "prettier --write ."
  }
}
```

## Contributing

We 💛 issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## Thank you

A project by [Stilearning](https://stilearning.com) &copy; 2022-2023.
