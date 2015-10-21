/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

let js = ''
let css = ''

// We should not do anything if required serverside.
if (typeof document != 'undefined') {
  let jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
  }
  let style = document.createElement('p').style
  let testProp = 'Transform'

  for (let key in jsCssMap) {
    if ((key + testProp) in style) {
      js = key
      css = jsCssMap[key]
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
