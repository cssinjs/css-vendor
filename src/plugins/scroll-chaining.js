import prefix from '../prefix'

// Support scroll-chaining props syntax.
// https://caniuse.com/#search=scroll-chaining
export default {
  supportedProperty: (prop) => {
    if (prop.substring(0, 15) !== 'scroll-chaining') return false
    if (prefix.js === 'ms') {
      return `${prefix.css}${prop}`
    }
    return prop
  }
}
