import prefix from '../prefix'
import camelize from '../camelize'

// Support old mask-border syntax.
// See https://github.com/postcss/autoprefixer/issues/502.
export default {
  supportedProperty: (prop, style) => {
    if (prop.match(/^mask-border/)) {
      const newProp = prop.replace(/^mask-border/, 'mask-box-image')
      return prefix.js + camelize(`-${newProp}`) in style ? prefix.css + newProp : false
    }
    return false
  }
}
