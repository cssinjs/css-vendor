import prefix from '../prefix'
// import pascalize from '../pascalize'

// writing-mode has basic support in webkit without prefix for svg documents
// but in other cases it might need a prefix. We can resort to value testing.
// See https://developer.mozilla.org/de/docs/Web/CSS/writing-mode
export default {
  noPrefill: ['writing-mode'],
  supportedProperty: (prop) => {
    if (prop === 'writing-mode') {
      if (prefix.js === 'Webkit' || prefix.js === 'ms') {
        return prefix.css + prop
      }
      return prop
    }
    return false
  }
}
