import prefix from '../prefix'
import pascalize from '../utils/pascalize'

// clip-path has basic support in webkit without prefix for svg documents
// but in other cases it might need a prefix. We can resort to value testing.
// See https://developer.mozilla.org/de/docs/Web/CSS/clip-path
export default {
  noPrefill: ['clip-path'],
  supportedProperty: (prop, style) => {
    if (prop !== 'clip-path' && prefix.js !== 'Webkit') {
      style.clipPath = 'inset(10px 20px 30px 40px)'
      const value = style.clipPath
      style.clipPath = ''
      if (value) return prop
      if (prefix.js + pascalize(prop) in style) {
        return prefix.css + prop
      }
    }
    return false
  }
}
