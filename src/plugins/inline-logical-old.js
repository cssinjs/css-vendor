import prefix from '../prefix'
import pascalize from '../utils/pascalize'

// Support old inline-logical syntax.
// See https://github.com/postcss/autoprefixer/issues/324.
export default {
  supportedProperty: (prop, style) => {
    if (!/^(border|margin|padding)-inline/.test(prop)) return false
    if (prefix.js === 'Moz') return prop
    const newProp = prop.replace('-inline', '')
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
  }
}
