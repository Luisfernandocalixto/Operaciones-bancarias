// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.hbs',

  ],
  theme: {
    extend: {},
  },daisyui: {
    themes: ["retro"]
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss')

  ],
}
