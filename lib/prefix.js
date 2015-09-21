'use strict'

/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

exports.js = exports.css = ''

// We should not do anything if required serverside.
if (typeof document != 'undefined') {
    var jsCssMap = {
        Webkit: '-webkit-',
        Moz: '-moz-',
        // IE did it wrong again ...
        ms: '-ms-',
        O: '-o-'
    }
    var style = document.createElement('p').style
    var testProp = 'Transform'

    for (var js in jsCssMap) {
        if ((js + testProp) in style) {
            exports.js = js
            exports.css = jsCssMap[js]
            break
        }
    }
}
