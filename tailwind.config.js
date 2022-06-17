/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      scale: {
        102: '1.02',
      },
      height: {
        '80-screen': '80vh',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
}
