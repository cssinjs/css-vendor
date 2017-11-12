import prefix from '../prefix'

// Support old mask-border syntax.
// See https://github.com/postcss/autoprefixer/issues/502.
export default {
  supportedProperty: (prop) => {
    if (/^mask-border/.test(prop)) {
      const newProp = prop.replace(/^mask-border/, 'mask-box-image')
      if (prefix.js === 'Webkit') {
        return prefix.css + newProp
      }
      return prop
    }
    return false
  }
}
