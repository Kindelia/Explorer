const height = require('./height')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../lib/ui/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scale: {
        102: '1.02',
      },
      height,
      borderWidth: {
        1: '1px',
      },
      colors: {
        teste: '#404040',
      },
    },
  },
  plugins: [],
}
