module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
    "stylelint-config-prettier",
  ],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin'] }],
  },
};
