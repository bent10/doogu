declare module 'doogu/eslint.config' {
  const _default: import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray
  export default _default
}

declare module 'doogu/prettier.config' {
  const _default: import('prettier').Config
  export default _default
}

declare module 'doogu/release.config' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _default: any
  export default _default
}
