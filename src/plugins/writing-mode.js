import prefix from '../prefix'

/** Support writing-mode prop syntax.
 * https://caniuse.com/#search=writing-mode
 */
export default {
  noPrefill: ['writing-mode'],
  supportedProperty: (prop) => {
    if (prop !== 'writing-mode') return false
    if (prefix.js === 'Webkit' || prefix.js === 'ms') {
      return prefix.css + prop
    }
    return prop
  }
}
