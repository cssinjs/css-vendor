import isInBrowser from 'is-in-browser'
import prefix from './prefix'
import supportedProperty from './supported-property'

const cache = {}
const transitionProperties = {
  transition: 1,
  'transition-property': 1,
  '-webkit-transition': 1,
  '-webkit-transition-property': 1
}
const transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g
let el

/**
 * Returns prefixed value transition/transform if needed.
 *
 * @param {String} match
 * @param {String} p1
 * @param {String} p2
 * @return {String}
 * @api private
 */
function prefixTransitionCallback(match, p1, p2) {
  if (p1 === 'var') return 'var'
  if (p1 === 'all') return 'all'
  if (p2 === 'var') return ', var'
  if (p2 === 'all') return ', all'
  const prefixedValue = p1 ? supportedProperty(p1) : `, ${supportedProperty(p2)}`
  if (!prefixedValue) return p1 || p2
  return prefixedValue
}

if (isInBrowser) el = document.createElement('p')

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */

export default function supportedValue(property, value) {
  // For server-side rendering.
  let prefixedValue = value
  if (!el || property === 'content') return value

  // It is a string or a number as a string like '1'.
  // We want only prefixable values here.
  // eslint-disable-next-line no-restricted-globals
  if (typeof prefixedValue !== 'string' || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue
  }

  // Create cache key for current value.
  const cacheKey = property + prefixedValue

  // Remove cache for benchmark tests or return value from cache.
  if (process.env.NODE_ENV !== 'benchmark' && cache[cacheKey] != null) {
    return cache[cacheKey]
  }

  // IE can even throw an error in some cases, for e.g. style.content = 'bar'.
  try {
    // Test value as it is.
    el.style[property] = prefixedValue
  } catch (err) {
    // Return false if value not supported.
    cache[cacheKey] = false
    return false
  }

  // If 'transition' or 'transition-property' property.
  if (transitionProperties[property]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback)
  } else if (el.style[property] === '') {
    // Value with a vendor prefix.
    prefixedValue = prefix.css + prefixedValue

    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
    if (prefixedValue === '-ms-flex') el.style[property] = '-ms-flexbox'

    // Test prefixed value.
    el.style[property] = prefixedValue

    // Return false if value not supported.
    if (el.style[property] === '') {
      cache[cacheKey] = false
      return false
    }
  }

  // Reset styles for current property.
  el.style[property] = ''

  // Write current value to cache.
  cache[cacheKey] = prefixedValue

  return cache[cacheKey]
}
