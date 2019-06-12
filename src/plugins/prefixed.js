import prefix from '../prefix'
import pascalize from '../utils/pascalize'

// Test if property is supported with vendor prefix.
export default {
  supportedProperty: (prop, style) => {
    const pascalized = pascalize(prop)
    // Return custom CSS variable or already prefixed value without prefixing.
    if (prop[0] === '-' || prop[1] === '-') return prop
    if (prefix.js + pascalized in style) return prefix.css + prop
    // Try webkit fallback.
    if (prefix.js !== 'Webkit' && `Webkit${pascalized}` in style) return `-webkit-${prop}`
    return false
  }
}
