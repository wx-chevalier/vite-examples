const baseConfig = require('../../.eslintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...(baseConfig.rules || {}),
    '@typescript-eslint/no-extraneous-class': 0,
  },
};
