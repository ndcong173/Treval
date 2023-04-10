/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors:{
        primary:'#E54853'
      },
      fontFamily:{
        'serif': ['ui-serif','Autography']
      },
    },
  },
  plugins: [],
}
