import prefix from '../prefix'

export default {
  noPrefill: ['appearance'],
  supportedProperty: (prop) => {
    if (prop !== 'appearance') return false
    if (prefix.js !== 'ms') {
      return `-webkit-${prop}`
    }
    return prefix.css + prop
  }
}
