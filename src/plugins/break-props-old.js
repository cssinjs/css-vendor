import prefix from '../prefix'
import pascalize from '../pascalize'

// Support old break-* props syntax.
// http://caniuse.com/#feat=multicolumn
// https://github.com/postcss/autoprefixer/issues/491
// https://github.com/postcss/autoprefixer/issues/177
export default {
  supportedProperty: (prop, style) => {
    if (prop.match(/^break-/)) {
      if (prefix.js === 'Webkit') {
        const jsProp = `WebkitColumn${pascalize(prop)}`
        return jsProp in style ? `${prefix.css}column-${prop}` : false
      }
      else if (prefix.js === 'Moz') {
        const jsProp = `page${pascalize(prop)}`
        return jsProp in style ? `page-${prop}` : false
      }
    }
    return false
  }
}
