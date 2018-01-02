const regExp = /[-\s]+(.)?/g

/**
 * Convert dash separated strings to camel cased.
 *
 * @param {String} str
 * @return {String}
 */

function toUpper(match, c) {
  return c ? c.toUpperCase() : ''
}

export default function camelize(str) {
  return str.replace(regExp, toUpper)
}
