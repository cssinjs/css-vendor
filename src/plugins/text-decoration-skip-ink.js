import prefix from '../prefix'

// Support old appearance props syntax.
// https://caniuse.com/#feat=text-decoration
export default {
  noPrefill: ['text-decoration-skip-ink'],
  supportedProperty: (prop) => {
    if (prop !== 'text-decoration-skip-ink') return false
    if (prefix.js === 'Webkit') return `-webkit-${prop}`
    if (prefix.js === 'Moz') return `-moz-${prop}`
    return prefix.css + prop
  }
}
