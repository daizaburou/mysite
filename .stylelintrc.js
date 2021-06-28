module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  "ignoreFiles": ["**/*.js"],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin'] }],
  },
};
