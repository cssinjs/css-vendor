import prefix from '../prefix'
import pascalize from '../pascalize'
import camelize from '../camelize'

// mask property support cannot be directly detected in webkit browsers,
// but we can use a longhand property instead.
export default {
  noPrefill: ['mask'],
  supportedProperty: (prop, style) => {
    if (/^mask/.test(prop)) {
      if (prefix.js === 'Webkit') {
        const longhand = 'mask-image'
        if (camelize(longhand) in style) {
          return prop
        }
        if (prefix.js + pascalize(longhand) in style) {
          return prefix.css + prop
        }
      }
      return prop
    }
    return false
  }
}
