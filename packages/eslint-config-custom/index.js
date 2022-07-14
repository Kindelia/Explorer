/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['eslint-plugin-import-helpers', 'jsx-a11y'],
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
          ['module'],
          ['/^kindelia/'],
          ['parent', 'sibling', 'index', '/^@//'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
}
