/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

let js = ''
let css = ''

// We should not do anything if required serverside.
if (typeof document != 'undefined') {
  const jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
  }
  const style = document.createElement('p').style
  const testProp = 'Transform'

  for (const key in jsCssMap) {
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
