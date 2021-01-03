module.exports = {
  name: 'icon',
  inputDir: './assets/svg',
  outputDir: './assets/fonts/icon',
  fontTypes: ['woff', 'woff2'],
  assetTypes: ['css'],
  fontsUrl: '~assets/fonts/icon/',
  prefix: 'icon',
  normalize: true,
  formatOptions: {
    svg: { centerHorizontally: true },
  },
  round: true,
  pathOptions: {
    css: './assets/scss/fonts/_icons.scss',
  },
}
