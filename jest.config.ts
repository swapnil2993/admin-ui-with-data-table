export default {
  globals: {
    fetch: global.fetch,
  },
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
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss|svg)$": "identity-obj-proxy",
  },
};
