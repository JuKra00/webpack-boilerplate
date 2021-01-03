const webpack = require('webpack')
const { merge } = require('webpack-merge')
const postcssNormalize = require('postcss-normalize')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: () => [postcssNormalize()],
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    // Analyze bundle sizes
    new BundleAnalyzerPlugin(),
  ],
})
