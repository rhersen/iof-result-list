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
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
  ],
  "rules": {
    "curly": ["error", "multi"],
    "complexity": ["error", 4],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-depth": ["error", 2],
    "max-len": ["error", 87],
    "max-params": ["error", 5],
    "max-statements": ["error", 10],
    "no-else-return": ["error"],
    "no-extra-parens": ["error"],
    "no-shadow": ["error"],
    "no-unneeded-ternary": ["error"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "no-unused-vars": "off"
  }
};