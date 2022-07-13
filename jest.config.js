module.exports = {
  globals: {
    'babel-jest': {
      extends: './babel.config.js',
    },
  },
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/*.js', '**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['text-summary'],
};
