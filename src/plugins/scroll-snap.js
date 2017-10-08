export default {
  supportedProperty: (prop) => {
    if (prop.startsWith('scroll-snap')) {
      return prop
    }
    return false
  }
}
