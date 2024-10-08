/**
 * @type {import('semantic-release').GlobalConfig}
 */
// eslint-disable-next-line no-undef
module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'alpha',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'changelog.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['changelog.md'],
        message:
          'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false
      }
    ],
    '@semantic-release/npm'
  ]
}
