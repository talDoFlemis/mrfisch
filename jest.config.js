import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/layout/(.*)$": "<rootDir>/components/layout/$1",
    "^@/svgs/(.*)$": "<rootDir>/components/svgs/$1",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["cypress"],
};

module.exports = createJestConfig(customJestConfig);
