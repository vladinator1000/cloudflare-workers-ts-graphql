module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  testRegex: 'itest.ts',
  globalSetup: './src/utils/setUpTests.ts',
  globalTeardown: './src/utils/tearDownIntegrationTests.ts',
}
