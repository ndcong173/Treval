/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
