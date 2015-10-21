'use strict';

exports.__esModule = true;
exports['default'] = supportedValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

var cache = {};
var el = undefined;

if (typeof document != 'undefined') el = document.createElement('p');

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */

function supportedValue(property, value) {
  if (typeof value != 'string' || !isNaN(parseInt(value, 10))) return value;

  var cacheKey = property + value;

  if (cache[cacheKey] != null) return cache[cacheKey];

  // Test value as it is.
  el.style[property] = value;

  // Value is supported as it is.
  if (el.style[property] === value) {
    cache[cacheKey] = value;
  } else {
    // Test value with vendor prefix.
    value = _prefix2['default'].css + value;

    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
    if (value === '-ms-flex') value = '-ms-flexbox';

    el.style[property] = value;

    // Value is supported with vendor prefix.
    if (el.style[property] === value) cache[cacheKey] = value;
  }

  if (!cache[cacheKey]) cache[cacheKey] = false;

  return cache[cacheKey];
}

module.exports = exports['default'];