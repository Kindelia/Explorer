const withTM = require('next-transpile-modules')(['@kindelia/lib'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
})
