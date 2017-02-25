import prefix from '../prefix'
import camelize from '../camelize'

// Support old break-* props syntax.
// http://caniuse.com/#feat=multicolumn
// https://github.com/postcss/autoprefixer/issues/491
// https://github.com/postcss/autoprefixer/issues/177
export default {
  supportedProperty: (prop, style) => {
    if (prop.match(/^break-/)) {
      if (prefix.js === 'Webkit') {
        const jsProp = `WebkitColumn${camelize(`-${prop}`)}`
        return jsProp in style ? `${prefix.css}column-${prop}` : false
      }
      else if (prefix.js === 'Moz') {
        const jsProp = `page${camelize(`-${prop}`)}`
        return jsProp in style ? `page-${prop}` : false
      }
    }
    return false
  }
}
