import isInBrowser from 'is-in-browser'
import prefix from './prefix'
import supportedProperty from './supported-property'

const cache = {}
const transitionProperties = [
  'transition',
  'transition-property',
  '-webkit-transition',
  '-webkit-transition-property',
]
const transPropsRegExp = /(^\s*\w+)|, (\s*\w+)/g
let el

function prefixTransitionCallback(match, p1, p2) {
  if (p1 === 'all') return 'all'
  if (p2 === 'all') return ', all'
  return p1 ? supportedProperty(p1) : `, ${supportedProperty(p2)}`
}

function stringToArray(string) {
  const arrayOfValues = []
  const values = string.split(', ')
  for (let v = 0; v < values.length; v++) {
    arrayOfValues[v] = values[v]
  }
  return arrayOfValues
}

function stringToDoubleArray(string) {
  const arrayOfArraysValues = []
  const valuesArrays = string.split(', ')
  for (let a = 0; a < valuesArrays.length; a++) {
    if (valuesArrays[a] !== '!important') {
      const arrayOfValues = []
      const values = valuesArrays[a].split(' ')
      for (let v = 0; v < values.length; v++) {
        arrayOfValues.push(values[v])
      }
      arrayOfArraysValues.push(arrayOfValues)
    }
    else {
      arrayOfArraysValues.push(valuesArrays[a])
    }
  }
  return arrayOfArraysValues
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
  if ((typeof value !== 'string' && !Array.isArray(value)) ||
    !isNaN(parseInt(value, 10))) {
    return value
  }

  let isDoubleArray = false
  let isArray = false

  if (Array.isArray(value)) {
    if (Array.isArray(value[0])) {
      isDoubleArray = true
      let doubleArrayValue = ''
      for (let a = 0; a < value.length; a++) {
        if (Array.isArray(value[a])) {
          for (let v = 0; v < value[a].length; v++) {
            if (v + 1 !== value[a].length) {
              doubleArrayValue += `${value[a][v]} `
            }
            else {
              doubleArrayValue += value[a][v]
            }
          }
        }
        else {
          doubleArrayValue += value[a]
        }
        if (a + 1 !== value.length) {
          doubleArrayValue += ', '
        }
      }
      value = doubleArrayValue
    }
    else {
      isArray = true
      let arrayValue = ''
      for (let v = 0; v < value.length; v++) {
        if (v + 1 !== value.length) {
          arrayValue += `${value[v]}, `
        }
        else {
          arrayValue += value[v]
        }
      }
      value = arrayValue
    }
  }

  const cacheKey = property + value

  if (cache[cacheKey] != null) {
    if (isArray) {
      return stringToArray(cache[cacheKey])
    }
    else if (isDoubleArray) {
      return stringToDoubleArray(cache[cacheKey])
    }
    return cache[cacheKey]
  }

  // IE can even throw an error in some cases, for e.g. style.content = 'bar'
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
    cache[cacheKey] = value.replace(transPropsRegExp, prefixTransitionCallback)
  }
  else if (el.style[property] !== '') {
    cache[cacheKey] = value
  }
  else {
    // Test value with vendor prefix.
    value = prefix.css + value

    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
    if (value === '-ms-flex') value = '-ms-flexbox'

    el.style[property] = value

    // Value is supported with vendor prefix.
    if (el.style[property] !== '') cache[cacheKey] = value
  }

  if (!cache[cacheKey]) cache[cacheKey] = false

  // Reset style value.
  el.style[property] = ''

  if (isArray) {
    return stringToArray(cache[cacheKey])
  }
  else if (isDoubleArray) {
    return stringToDoubleArray(cache[cacheKey])
  }
  return cache[cacheKey]
}
