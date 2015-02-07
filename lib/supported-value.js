'use strict'

var prefix = require('./prefix')

var cache = {}

var el = document.createElement('p')

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (property, value) {
    if (typeof value != 'string') return value

    var cacheKey = property + value

    if (cache[cacheKey] != null) return cache[cacheKey]

    // Test value as it is.
    el.style[property] = value

    // Value is supported as it is.
    if (el.style[property] == value) {
        cache[cacheKey] = value
        return value
    }

    // Test value with vendor prefix.
    value = prefix.css + value
    cacheKey = property + value
    el.style[property] = value

    // Value is supported with vendor prefix.
    if (el.style[property] == value) {
        cache[cacheKey] = value
        return value
    }

    return false
}
