import prefix from '../prefix'
import pascalize from '../utils/pascalize'

/** Support old filter props syntax.
 * https://caniuse.com/#search=filter
 */
export default {
  noPrefill: ['filter'],
  supportedProperty: (prop, style) => {
    if (prop === 'filter' && prefix.js === 'Webkit') {
      if (prefix.js + pascalize(prop) in style) {
        return prefix.css + prop
      }
      return prop
    }
    return false
  }
}
