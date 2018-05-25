import prefix from '../prefix'

// Support scroll-chaining props syntax.
// https://caniuse.com/#search=overscroll-behavior
export default {
  supportedProperty: (prop) => {
    if (prop !== 'overscroll-behavior') return false
    if (prefix.js === 'ms') {
      return `${prefix.css}scroll-chaining`
    }
    return prop
  }
}
