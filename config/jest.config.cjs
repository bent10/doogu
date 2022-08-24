module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  watchPathIgnorePatterns: ['<rootDir>/test/fixtures'],
  clearMocks: true,
  coverageDirectory: 'coverage'
}
