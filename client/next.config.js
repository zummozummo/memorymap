const path =  require('path')

const withSass = require('sass')


// next.config.js
module.exports = {
  distDir: 'build',
  watchOptions: {
    poll: 300,
  },
  cssModules: true,
  sassOptions: {
    includePaths: [path.join(__dirname,'styles')],
  },
}
