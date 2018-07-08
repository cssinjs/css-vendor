import prefix from './prefix'

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {String}
 * @api public
 */

export default function supportedKeyframes(key) {
  if (key[1] === '-') return key
  const rest = key.substr(10)
  if (prefix.js === 'ms') return `@keyframes${rest}`
  return `@${prefix.css}keyframes${rest}`
}
