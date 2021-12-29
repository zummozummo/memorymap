const path =  require('path')

const withSass = require('sass')


// next.config.js
module.exports = {
  watchOptions: {
    poll: 300,
  },
  cssModules: true,
  sassOptions: {
    includePaths: [path.join(__dirname,'styles')],
  },
}
