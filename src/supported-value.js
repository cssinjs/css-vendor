import isInBrowser from 'is-in-browser'
import prefix from './prefix'
import supportedProperty from './supported-property'
import toCssValue from 'jss/lib/utils/toCssValue'

const cache = {}
const transitionProperties = [
  'transition',
  'transition-property',
  '-webkit-transition',
  '-webkit-transition-property'
]
const transPropsRegExp = /(^\s*\w+)|, (\s*\w+)/g
let el
let isImportant = false

function prefixTransitionCallback(match, p1, p2) {
  if (p1 === 'all') return 'all'
  if (p2 === 'all') return ', all'
  return p1 ? supportedProperty(p1) : `, ${supportedProperty(p2)}`
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
  if (!el) return value

  // It is a string or a number as a string like '1'.
  // We want only prefixable values here.
  if (
    (typeof value !== 'string' &&
    !Array.isArray(value)) ||
    !isNaN(parseInt(value, 10))) {
    return value
  }

  const cacheKey = property + value

  if (cache[cacheKey] != null) return cache[cacheKey]

  if (Array.isArray(value)) {
    if (value[value.length - 1] === '!important') {
      isImportant = true
    }
    value = toCssValue(value, true)
  }

  // IE can even throw an error in some cases, for e.g. style.content = 'bar's
  try {
    // Test value as it is.
    el.style[property] = value
  }
  catch (err) {
    cache[cacheKey] = false
    return false
  }

  // Value is supported as it is.
  if (transitionProperties.indexOf(property) !== -1) {
    value = value.replace(transPropsRegExp, prefixTransitionCallback)
  }
  else if (el.style[property] === '') {
    // Test value with vendor prefix.
    value = prefix.css + value

    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
    if (value === '-ms-flex') value = '-ms-flexbox'

    el.style[property] = value

    if (el.style[property] === '') {
      cache[cacheKey] = false
      return false
    }
  }

  // Reset style value.
  el.style[property] = ''

  if (isImportant) {
    value += ' !important'
    isImportant = false
  }

  cache[cacheKey] = value

  return cache[cacheKey]
}
