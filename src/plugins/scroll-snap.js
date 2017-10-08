export default {
  supportedProperty: (prop) => {
    if (prop.substring(0, 11) === 'scroll-snap') {
      return prop
    }
    return false
  }
}
