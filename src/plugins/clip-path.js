import prefix from '../prefix'
import pascalize from '../utils/pascalize'

// Support old *-clip-path props syntax.
// https://caniuse.com/#search=clip-path
export default {
  noPrefill: ['clip-path'],
  supportedProperty: (prop, style) => {
    if (prop === 'clip-path' && prefix.js === 'Webkit') {
      if (prefix.js + pascalize(prop) in style) {
        return prefix.css + prop
      }
      return prop
    }
    return false
  }
}
