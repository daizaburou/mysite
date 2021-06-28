module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jquery: true,
  },
  globals: {
    Vimeo: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
};
