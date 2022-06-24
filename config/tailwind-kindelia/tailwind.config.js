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
        bg: {
          light: '#f4f4f5',
          dark: '#262626',
        },
        font: {
          light: '#1c1917',
          dark: '#fafafa',
        },
        fontPlaceHolder: {
          light: '#1c1917',
          dark: '#fafafa',
        },
        searchbar: {
          light: '#d4d4d8',
          dark: '#71717a',
        },
      },
    },
  },
  plugins: [],
}
