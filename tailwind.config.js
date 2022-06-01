module.exports = {
  content: ['./src/**/*.html', './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: ['class']
}