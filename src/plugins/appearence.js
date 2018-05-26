import prefix from '../prefix'

// Support old appearance props syntax.
// https://caniuse.com/#search=appearance
export default {
  noPrefill: ['appearance'],
  supportedProperty: (prop) => {
    if (prop !== 'appearance') return false
    if (prefix.js === 'ms') return `-webkit-${prop}`
    return prefix.css + prop
  }
}
