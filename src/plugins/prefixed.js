import prefix from '../prefix'
import pascalize from '../pascalize'

// Test if property is supported with vendor prefix.
export default {
  supportedProperty: (prop, style) =>
    (prefix.js + pascalize(prop) in style ? prefix.css + prop : false),
}

