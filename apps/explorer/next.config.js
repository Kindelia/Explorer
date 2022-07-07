const fix_dark = require('tailwind-kindelia/fix_dark')
const withTM = require('next-transpile-modules')(['ui'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    return fix_dark(config)
  },
})
