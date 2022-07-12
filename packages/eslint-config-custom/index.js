/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['eslint-plugin-import-helpers'],
  parser: '@typescript-eslint/parser',
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
          ['module', '/^@shared/'],
          ['/^kindelia/', '/^@//', 'parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'desc', ignoreCase: true },
      },
    ],
  },
}
