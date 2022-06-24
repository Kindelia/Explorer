/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-kindelia`
  extends: ['kindelia'],
  settings: {
    next: {
      rootDir: ['*/'],
    },
  },
}
