module.exports = {
  content: ['./src/**/*.html', './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
      'xs': '475px',
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: ['class']
}