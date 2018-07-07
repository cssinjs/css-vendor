import prefix from './prefix'

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {Boolean}
 * @api public
 */

export default function supportedKeyframes(browser = prefix.js) {
  if (browser === 'ms') return false
  return true
}
