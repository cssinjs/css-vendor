import prefix from './prefix'

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {Boolean}
 * @api public
 */

export default function supportedKeyframes() {
  if (prefix.js === 'ms') return '@'
  return `@${prefix.css}`
}
