import prefix from '../prefix'

export default {
  noPrefill: ['color-adjust'],
  supportedProperty: (prop) => {
    if (prop !== 'color-adjust') return false
    if (prefix.js === 'Webkit') return `${prefix.css}print-${prop}`
    return prefix.css + prop
  }
}
