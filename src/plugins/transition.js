import prefix from '../prefix'

export default {
  noPrefill: ['transition'],
  supportedProperty: (prop, style, options) => {
    if (prop !== 'transition') return false
    if (options.transition) {
      return prop
    }
    return prefix.css + prop
  }
}
