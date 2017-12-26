import prefix from '../prefix'

export default {
  noPrefill: ['appearance'],
  supportedProperty: (prop) => {
    if (prop === 'appearance') {
      return prefix.css + prop
    }
    return false
  }
}
