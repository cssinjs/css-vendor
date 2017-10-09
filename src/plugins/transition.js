import prefix from '../prefix'

export default {
  noPrefill: ['transition'],
  supportedProperty: (prop, style, options) => {
    if (prop === 'transition') {
      if (options.transition) {
        return prefix.css + prop
      }
      return prop
    }
    return false
  }
}
