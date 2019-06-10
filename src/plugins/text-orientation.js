import prefix from '../prefix'

// Support text-orientation prop syntax.
// https://caniuse.com/#search=text-orientation
export default {
  noPrefill: ['text-orientation'],
  supportedProperty: prop => {
    if (prop !== 'text-orientation') return false
    if (prefix.vendor === 'apple' && !prefix.isTouch) {
      return prefix.css + prop
    }
    return prop
  }
}
