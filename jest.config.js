/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['lcov', 'text-summary'],
  globals: {
    window: {}
  },
  transform: {
    "^.+\\.scss$": 'jest-scss-transform',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [{ path: 'node_modules/ts-jest-mock-import-meta' }]
        }
      }
    ]
  }
};
