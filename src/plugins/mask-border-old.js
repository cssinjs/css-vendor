import prefix from '../prefix'
import pascalize from '../pascalize'

// Support old mask-border syntax.
// See https://github.com/postcss/autoprefixer/issues/502.
export default {
  supportedProperty: (prop, style) => {
    if (/^mask-border/.test(prop)) {
      const newProp = prop.replace(/^mask-border/, 'mask-box-image')
      return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
    }
    return false
  }
}
