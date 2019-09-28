import prefix from '../prefix'

// Support text-orientation prop syntax.
// https://caniuse.com/#search=user-select
export default {
  noPrefill: ['user-select'],
  supportedProperty: prop => {
    if (prop !== 'user-select') return false
    if (prefix.js === 'Moz') return prefix.css + prop
    return prop
  }
}
