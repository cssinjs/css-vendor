'use strict'

var prefix = require('./prefix')
var camelize = require('./camelize')

var el = document.createElement('p')

/**
 * We test every property on vendor prefix requirement.
 * Once tested, result is cached. It gives us up to 70% perf boost.
 * http://jsperf.com/element-style-object-access-vs-plain-object
 *
 * Prefill cache with known css properties to reduce amount of
 * properties we need to feature test at runtime.
 * http://davidwalsh.name/vendor-prefix
 */
var cache = (function() {
    var computed = window.getComputedStyle(document.documentElement, '')
    var cache = {}
    for (var key in computed) {
        cache[computed[key]] = false
    }
    return cache
}())

/**
 * Test if a property is supported, returns property with vendor
 * prefix if required, otherwise `false`.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (prop) {
    // We have not tested this prop yet, lets do the test.
    if (cache[prop] == null) {
        // Camelization is required because we can't test using
        // css syntax e.g. in ff.
        var camelized = prefix.js + camelize('-' + prop)
        // Test if property is supported.
        cache[prop] = camelized in el.style ? prefix.css + prop : false
    }

    return cache[prop]
}
