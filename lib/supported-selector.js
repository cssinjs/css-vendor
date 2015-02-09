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
