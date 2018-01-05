const regExp = /[-\s]+(.)?/g

/**
 * Replaces the letter with the capital letter
 *
 * @param {String} match
 * @param {String} c
 * @return {String}
 * @api private
 */
function toUpper(match, c) {
  return c ? c.toUpperCase() : ''
}

/**
 * Convert dash separated strings to camel cased.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
export default function camelize(str) {
  return str.replace(regExp, toUpper)
}
