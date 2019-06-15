// Export javascript style and css style vendor prefixes.
// Based on "transform" support test.

import isInBrowser from 'is-in-browser'

let js = ''
let css = ''
let vendor = ''
let browser = ''
let isTouch = false

// We should not do anything if required serverside.
if (isInBrowser) {
  // Order matters. We need to check Webkit the last one because
  // other vendors use to add Webkit prefixes to some properties
  const jsCssMap = {
    Moz: '-moz-',
    ms: '-ms-',
    O: '-o-',
    Webkit: '-webkit-'
  }

  const {style} = document.createElement('p')
  const testProp = 'Transform'

  for (const key in jsCssMap) {
    if (key + testProp in style) {
      js = key
      css = jsCssMap[key]
      break
    }
  }

  // Correctly detect the Edge browser.
  if (js === 'Webkit' && 'msHyphens' in style) {
    js = 'ms'
    css = jsCssMap.ms
    browser = 'edge'
  }

  // Correctly detect the Safari browser.
  if (js === 'Webkit' && '-apple-trailing-word' in style) {
    vendor = 'apple'
  }

  isTouch = 'ontouchstart' in document.documentElement
}

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String, vendor: String, browser: String}}
 * @api public
 */
export default {js, css, vendor, browser, isTouch}
