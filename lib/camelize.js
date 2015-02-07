'use strict'

var regExp = /[-\s]+(.)?/g

/**
 * Convert dash separated strings to camel cased.
 *
 * @param {String} str
 * @return {String}
 */
module.exports = function(str) {
    return str.replace(regExp, toUpper)
}

function toUpper(match, c) {
    return c ? c.toUpperCase() : ''
}

