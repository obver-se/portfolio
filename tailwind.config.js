module.exports = {
  purge: [
    './src/**/*.pug',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    maxHeight: {
      '1/2': '50%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
