/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'prettier/prettier': 'warn',
    '@next/next/no-img-element': 'off',
    // 'import-helpers/order-imports': [
    //   'warn',
    //   {
    //     newlinesBetween: 'always', // new line between groups
    //     groups: [
    //       ['/^react/', '/^next/'],
    //       'module',
    //       '/^@shared/',
    //       ['parent', 'sibling', 'index'],
    //     ],
    //     alphabetize: { order: 'asc', ignoreCase: true },
    //   },
    // ],
    // turborepo:
    // "@next/next/no-html-link-for-pages": "off",
    // "react/jsx-key": "off",
  },
}
