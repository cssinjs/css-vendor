import prefix from '../prefix'

// Support scroll-snap props syntax.
// https://caniuse.com/#search=scroll-snap
export default {
  supportedProperty: prop => {
    if (prop.substring(0, 11) !== 'scroll-snap') return false
    if (prefix.js === 'ms') {
      return `${prefix.css}${prop}`
    }
    return prop
  }
}
