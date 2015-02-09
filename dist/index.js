!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.cssVendor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
exports.prefix = require('./lib/prefix')

/**
 * Test if a property is supported, returns property with vendor
 * prefix if required, otherwise `false`.
 *
 * @param {String} prop
 * @return {String|Boolean}
 * @api public
 */
exports.supportedProperty = require('./lib/supported-property')

/**
 * Test if a selector is supported. Returns normal selector untouched,
 * at-rule selector with vendor prefix if required, or false if at-rule is not supported.
 *
 * @param {String} selector
 * @return {String|Boolean}
 * @api public
 */
exports.supportedSelector = require('./lib/supported-selector')

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */
exports.supportedValue = require('./lib/supported-value')

},{"./lib/prefix":3,"./lib/supported-property":4,"./lib/supported-selector":5,"./lib/supported-value":6}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
'use strict'

/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

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

},{}],4:[function(require,module,exports){
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
        cache[computed[key]] = computed[key]
    }

    return cache
}())

/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (prop) {
    // We have not tested this prop yet, lets do the test.
    if (cache[prop] != null) return cache[prop]

    // Camelization is required because we can't test using
    // css syntax for e.g. in FF.
    // Test if property is supported as it is.
    if (camelize(prop) in el.style) {
        cache[prop] = prop
    // Test if property is supported with vendor prefix.
    } else if ((prefix.js + camelize('-' + prop)) in el.style) {
        cache[prop] = prefix.css + prop
    } else {
        cache[prop] = false
    }

    return cache[prop]
}

},{"./camelize":2,"./prefix":3}],5:[function(require,module,exports){
'use strict'

// Create a shortcut for the CSSRule interface
var CSSRule = window.CSSRule

// Define prefixes as they are used in this context
var prefixes = ['MOZ_', 'WEBKIT_', 'O_', 'MS_', '']

var cache = {}

/**
 * Test if a selector is supported, returns supported selector with vendor
 * prefix if required.
 *
 * Returns selector if at-rule is not present.
 * Returns at-rule if present and feature-detected. Rule is vendor prefixed if required.
 * Returns `false` if at-rule is present and not supported.
 *
 * @param {String} selector
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (selector) {
    if (selector[0] !== '@') {
        // No at-rule present to feature detect.
        return selector
    }

    var selectorTokens = selector.split(' ')
    var atRule = selectorTokens[0].substr(1)
    var remainderTokens = selectorTokens.slice(1)
    var supportedAtRule = cache[atRule] || getSupportedAtRule(atRule)

    return supportedAtRule && [supportedAtRule]
        .concat(remainderTokens)
        .join(' ')
}

/**
 * Test if an at-rule is supported, returns supported rule with vendor
 * prefix if required, or false if at-rule is not supported.
 *
 * @param {String} selector
 * @return {String|Boolean}
 * @api public
 * Feature test adapted from https://github.com/ryanmorr/is-rule-supported
 */
function getSupportedAtRule(atRule) {
    // Convert the rule name to a form compatible with the CSSRule type constants
    var rule = atRule.toUpperCase().split('-').join('_') + '_RULE'
    var length = prefixes.length;
    var support = false
    var supportedPrefix
    var result

    // Loop the prefixes while support is yet to be determined
    while (!support && length--) {
        // Support will be tested with no prefix first before
        // prepending each vendor prefix to the constant name and testing it
        supportedPrefix = prefixes[length]
        support = (supportedPrefix + rule) in CSSRule;
    }

    if (support === false) {
        cache[atRule] = false
        return false
    } else if (supportedPrefix !== '') {
        supportedPrefix = '-' + supportedPrefix.replace('_', '-').toLowerCase()
    }

    cache[atRule] = '@' + supportedPrefix + atRule
    return cache[atRule]
}

},{}],6:[function(require,module,exports){
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
    if (typeof value != 'string' || !isNaN(parseInt(value, 10))) return value

    var cacheKey = property + value

    if (cache[cacheKey] != null) return cache[cacheKey]

    // Test value as it is.
    el.style[property] = value

    // Value is supported as it is.
    if (el.style[property] == value) {
        cache[cacheKey] = value
    } else {
        // Test value with vendor prefix.
        value = prefix.css + value
        el.style[property] = value

        // Value is supported with vendor prefix.
        if (el.style[property] == value) cache[cacheKey] = value
    }

    if (!cache[cacheKey]) cache[cacheKey] = false

    return cache[cacheKey]
}

},{"./prefix":3}]},{},[1])(1)
});