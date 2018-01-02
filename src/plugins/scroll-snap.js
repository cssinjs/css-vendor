import prefix from '../prefix'

export default {
  supportedProperty: (prop) => {
    if (prop.substring(0, 11) !== 'scroll-snap') return false
    if (prefix.js === 'ms') {
      return `${prefix.css}${prop}`
    }
    return prop
  }
}
