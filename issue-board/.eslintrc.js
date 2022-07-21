"use strict";
/* eslint-env node */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    "jest/globals": true,
  },
  plugins: ["@typescript-eslint/eslint-plugin", "react", "prettier", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "jest/no-hooks": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "jsx-runtime": {
      plugins: ["react"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "react/react-in-jsx-scope": 0,
        "react/jsx-uses-react": 0,
      },
    },
  },
};
