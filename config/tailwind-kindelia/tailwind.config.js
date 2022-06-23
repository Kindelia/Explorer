const height = require('./height')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{ts,tsx,css}',
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
