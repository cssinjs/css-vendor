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
  const prefixes = ['Moz', 'Webkit', 'ms', 'O']

  const style = document.createElement('p').style
  const testProp = 'Transform'

  const vendor = prefixes.find(prefix => (prefix + testProp) in style)
  if (vendor) {
    js = vendor
    css = jsCssMap[vendor]
  }
}

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
export default {js, css}
