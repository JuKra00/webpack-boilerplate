const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../assets'),
  dev: path.resolve(__dirname, '../cms/assets'),
  // Production build files
  build: path.resolve(__dirname, '../cms/assets'),
}
