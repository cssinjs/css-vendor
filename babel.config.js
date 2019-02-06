module.exports = api => {
  api.cache(true)
  const presets = [['@babel/env', {loose: true}]]
  const plugins = [
    'transform-es2015-spread',
    'transform-es3-member-expression-literals',
    'transform-es3-property-literals'
  ]

  if (process.env.NODE_ENV === 'test') {
    plugins.push('rewire')
  }

  return {
    presets,
    plugins
  }
}
