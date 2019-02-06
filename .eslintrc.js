module.exports = {
  parser: 'babel-eslint',
  extends: ['jss', 'prettier'],
  globals: {
    benchmark: true
  },
  env: {
    mocha: true,
    browser: true
  }
}
