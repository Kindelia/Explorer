/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    '@next/next/no-img-element': 'off',
  },
}
