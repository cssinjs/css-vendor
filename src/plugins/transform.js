import prefix from '../prefix'

// Support transform prop syntax.
// https://caniuse.com/#search=transform
export default {
  noPrefill: ['transform'],
  supportedProperty: (prop, style, options) => {
    if (prop !== 'transform') return false
    if (options.transform) {
      return prop
    }
    return prefix.css + prop
  }
}
