import prefix from '../prefix'

export default {
  supportedProperty: (prop) => {
    if (prop.substring(0, 11) === 'scroll-snap') {
      if (prefix.js === 'ms') {
        return `${prefix.css}${prop}`
      }
      return prop
    }
    return false
  }
}
