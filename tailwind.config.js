const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.pug',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'material-black': '#121212',
        'link-accent': colors.red[500],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
