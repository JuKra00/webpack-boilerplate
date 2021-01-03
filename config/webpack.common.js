const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
/* Not yet ready for webpack 5
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
const modernizrConfig = {
  'feature-detects': [
    'forms/placeholder',
    'svg/inline',
    'svg/asimg',
    'css/backgroundblendmode',
    'css/animations'
  ],
  filename: 'js/modernizr.js',
  options: ['setClasses'],
  minify: {
    output: {
      comments: true,
      beautify: true
    }
  }
}
*/

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    main: [paths.src + '/js/index.js', paths.src + '/scss/styles.scss'],
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: '/assets/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'assets', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),
  ],

  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      masonry: 'masonry-layout',
      isotope: 'isotope-layout',
    },
    extensions: ['*', '.mjs', '.js', '.svelte', '.vue', '.json'],
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // Svelte: Compile Svelte JS Template files
      {
        test: /\.(html|svelte)$/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              emitCss: false,
              hotReload: true,
              css: false,
            },
          },
        ],
      },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.m?js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      // Inline svg files
      {
        test: /\.(svg|)$/,
        type: 'asset/inline',
      },

      // Expose specific module if used

      // {
      //   test: require.resolve('cookies-eu-banner'),
      //   use: [
      //     {
      //       loader: 'expose-loader',
      //       options: {
      //         exposes: ['CookiesEuBanner'],
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: require.resolve('js-cookie'),
      //   use: [
      //     {
      //       loader: 'expose-loader',
      //       options: {
      //         exposes: ['Cookies2'],
      //       },
      //     },
      //   ],
      // },
    ],
  },
}
