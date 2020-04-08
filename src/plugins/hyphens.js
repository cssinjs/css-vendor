import prefix from '../prefix'

// Support hyphens prop syntax.
// https://caniuse.com/#search=hyphens
export default {
  noPrefill: ['hyphens'],
  supportedProperty: (prop) => {
    if (prop !== 'hyphens') return false
    if (prefix.vendor === 'apple' || (prefix.js === 'ms' && prefix.browser !== 'edge')) {
      return prefix.css + prop
    }
    return prop
  }
}
