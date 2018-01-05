import prefix from '../prefix'
import pascalize from '../utils/pascalize'

/** Support old break-* props syntax.
 * https://caniuse.com/#search=multicolumn
 * https://github.com/postcss/autoprefixer/issues/491
 * https://github.com/postcss/autoprefixer/issues/177
 */
export default {
  supportedProperty: (prop, style) => {
    if (!/^break-/.test(prop)) return false
    if (prefix.js === 'Webkit') {
      const jsProp = `WebkitColumn${pascalize(prop)}`
      return jsProp in style ? `${prefix.css}column-${prop}` : false
    }
    if (prefix.js === 'Moz') {
      const jsProp = `page${pascalize(prop)}`
      return jsProp in style ? `page-${prop}` : false
    }
    return false
  }
}
