import camelize from './camelize'

/**
 * Convert dash separated strings to pascal cased.
 *
 * @param {String} str
 * @return {String}
 */
export default function pascalize(str) {
  return camelize(`-${str}`)
}

