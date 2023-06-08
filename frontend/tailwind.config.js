/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        container: {
            padding: '1rem',
          },
    },
    colors: {
        'bodyblue': '#18222f',
        'darkblue': '#27374D',
        'blue': '#526D82',
        'greyblue': '#9DB2BF',
        'lightblue': '#DD56ED',
        'black': 'black',
        'transparent': 'transparent',
        'white': 'white'
    },
    plugins: [],
    }
}
