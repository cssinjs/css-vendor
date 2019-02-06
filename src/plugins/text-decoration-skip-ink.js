import prefix from '../prefix'

// Support old appearance props syntax.
// https://caniuse.com/#feat=text-decoration
export default {
  noPrefill: ['text-decoration-skip-ink'],
  supportedProperty: prop => {
    if (prop !== 'text-decoration-skip-ink') return false
    if (prefix.browser === 'safari') return `${prefix.css}${prop}`
    if (prefix.js === 'Webkit' || prefix.js === 'Moz') return prop
    return prefix.css + prop
  }
}
