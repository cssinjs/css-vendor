/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

import isBrowser from 'is-browser'

let js = ''
let css = ''

// We should not do anything if required serverside.
if (isBrowser) {
  const jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
  }

  // Order matters. We need to check Webkit the last one because
  // other vendors use to add Webkit prefixes to some properties
  const prefixes = ['Moz', 'ms', 'O', 'Webkit']

  const style = document.createElement('p').style
  const testProp = 'Transform'

  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    if ((prefix + testProp) in style) {
      js = prefix
      css = jsCssMap[prefix]
      break
    }
  }
}

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
export default {js, css}
