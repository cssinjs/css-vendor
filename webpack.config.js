module.exports = {
  entry: ['./src/index.js'],
  output: {
    library: 'cssVendor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  node: {
    fs: 'empty',
  }
}
