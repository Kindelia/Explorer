/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'prettier/prettier': 'warn',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: [
          ['/^react/', '/^next/'],
          ['/^kindelia/', '/^explorer/', '/^sale/'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}
