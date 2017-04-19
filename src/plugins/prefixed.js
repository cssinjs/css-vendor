import prefix from '../prefix'
import pascalize from '../pascalize'

// Test if property is supported with vendor prefix.
export default {
  supportedProperty: (prop, style) => {
    const pascalized = pascalize(prop)
    if (prefix.js + pascalized in style) return prefix.css + prop
    // Try webkit fallback.
    // E.g. appearance in Edge & IE Mobile needs a -webkit- prefix.
    if (prefix.js !== 'Webkit' && `Webkit${pascalized}` in style) return `-webkit-${prop}`
    return false
  }
}

