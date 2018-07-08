import prefix from './prefix'

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {String}
 * @api public
 */

export default function supportedKeyframes(key) {
  // Keyframes is already prefixed. e.g. key = '@-webkit-keyframes a'
  if (key[1] === '-') return key
  // No need to prefix IE/Edge
  // https://caniuse.com/#search=keyframes
  if (prefix.js === 'ms') return key
  return `@${prefix.css}keyframes${key.substr(10)}`
}
