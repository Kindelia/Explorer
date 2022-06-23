/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scale: {
        102: '1.02',
      },
      height: [...Array(101).keys()].reduce((prev, i) => {
        prev[`${i}-screen`] = `${i}vh`
        return prev
      }, {}),
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
