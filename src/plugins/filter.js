import prefix from '../prefix'
import pascalize from '../pascalize'

// filter has basic support in webkit without prefix for svg documents
// but in other cases it might need a prefix. We can resort to value testing.
// See https://developer.mozilla.org/de/docs/Web/CSS/filter
export default {
  noPrefill: ['filter'],
  supportedProperty: (prop, style) => {
    if (prop === 'filter' && prefix.js === 'Webkit') {
      style.filter = 'grayscale(50%)'
      const value = style.filter
      style.filter = ''
      if (value) return prop
      if (prefix.js + pascalize(prop) in style) {
        return prefix.css + prop
      }
    }
    return false
  }
}
