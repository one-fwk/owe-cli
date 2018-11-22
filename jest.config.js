module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
    },
  },
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).+(ts|tsx)',
  ],
};