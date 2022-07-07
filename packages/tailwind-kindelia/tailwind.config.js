const height = require('./height')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/lib/ui/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scale: {
        102: '1.02',
      },
      height,
      minHeight: height,
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
        searchbar: {
          light: '#d4d4d8',
          dark: '#71717a',
        },
        primary: {
          light: '#333333',
        },
        secondary: {
          light: '#87878a',
        },
        tertiary: {
          light: '#a3a4a8',
        },
        link: {
          light: '#001d82',
        },
        inset: {
          light: '#dddcda',
        },
        success: {
          light: '#2aba13',
        },
      },
    },
  },
  plugins: [],
}
