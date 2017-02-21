import prefix from '../prefix'
import camelize from '../camelize'

// Support old inline-logical syntax.
// See https://github.com/postcss/autoprefixer/issues/324.
export default {
  supportedProperty: (prop, style) => {
    if (prop.match(/^(border|margin|padding)-inline/)) {
      const newProp = prop.replace('-inline', '')
      return prefix.js + camelize(`-${newProp}`) in style ? prefix.css + newProp : false
    }
    return false
  }
}
