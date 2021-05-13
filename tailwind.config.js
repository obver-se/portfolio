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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
