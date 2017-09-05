import prefix from '../prefix'

// filter has basic support in webkit without prefix for svg documents
// but in other cases it might need a prefix. We can resort to value testing.
// See https://developer.mozilla.org/de/docs/Web/CSS/filter
export default {
  noPrefill: ['transition', 'transform'],
  supportedProperty: (prop, style, options) => {
    if (prop === 'transition' || prop === 'transform') {
      if (options.transform) {
        return prefix.css + prop
      }
      return prop
    }
    return false
  }
}
