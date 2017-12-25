import 'babel-polyfill'

const context = require.context('./tests', true, /\.test\.js$/)
context.keys().forEach(context)
