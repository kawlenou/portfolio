/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006BFF',
        secondary: '#E6F0FF',
        "text-primary": '#0B3558',
        "text-secondary": '#476788',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        polysans: ['PolySans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

