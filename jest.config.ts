import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest'

const presetConfig = createDefaultPreset();

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ['jest.setup.ts'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/lib/',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 50, // It should be in 95
      functions: 57, // It should be in 95
      lines: 60, // It should be in 95
      statements: 60, // It should be in 95
    },
  },
}

export default jestConfig