import prefix from '../prefix'

// Support old color-adjust prop syntax.
// https://caniuse.com/#search=color-adjust
export default {
  noPrefill: ['color-adjust'],
  supportedProperty: prop => {
    if (prop !== 'color-adjust') return false
    if (prefix.js === 'Webkit') return `${prefix.css}print-${prop}`
    return prop
  }
}
