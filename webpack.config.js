const webpack = require('webpack')

const plugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV === 'development',
    __TEST__: process.env.NODE_ENV === 'test'
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: ['./src/index.js', './tests/index.test.js'],
  output: {
    filename: 'dist/bundle.js',
    library: 'cssVendor',
    libraryTarget: 'umd'
  },
  plugins,
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  node: {
    fs: 'empty',
  }
}
