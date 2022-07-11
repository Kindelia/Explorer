const fix_dark = require('tailwind/fix_dark')

const withTM = require('next-transpile-modules')(['kindelia'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    return fix_dark(config)
  },
})
