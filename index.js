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
