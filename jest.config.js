const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@layout/(.*)$": ["<rootDir>/components/layout/$1"],
    "^@svgs/(.*)$": ["<rootDir>/components/svgs/$1"],
    "^@utils/(.*)$": ["<rootDir>/utils/$1"],
    "^@tests/(.*)$": ["<rootDir>/__tests__/$1"],
    "^@test-utils/(.*)$": ["<rootDir>/test-utils/$1"],
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
