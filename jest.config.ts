export default {
  globals: {
    fetch: global.fetch,
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          exclude: ["**"],
        },
      },
    ],
    "\\.(svg)$": "<rootDir>/src/__mocks__/svgMock.ts",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/__mocks__/svgMock.ts",
  },
};
