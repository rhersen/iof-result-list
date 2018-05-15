module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  globals: {
    require: false,
    module: true,
    _: true,
    describe: false,
    expect: false,
    jest: false,
    it: false
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
  ],
  "rules": {
    "complexity": ["error", 4],
    "max-depth": ["error", 2],
    "max-params": ["error", 5],
    "max-statements": ["error", 10],
    "no-shadow": ["error"],
    "no-var": ["error"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
  }
};