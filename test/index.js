'use strict'

QUnit.module('vendor prefix')

test('finding css vendor prefix', function () {
    equal(typeof cssVendor.prefix.css, 'string', 'is string')
    equal(cssVendor.prefix.css[0], '-', 'starts with dash')
    equal(cssVendor.prefix.css[cssVendor.prefix.css.length-1], '-', 'ends with dash')
    ok(cssVendor.prefix.css.length >= 3, 'min length ok')
})

test('js vendor prefix is defined', function () {
    equal(typeof cssVendor.prefix.js, 'string', 'is string')
})

QUnit.module('property support')

test('known property', function () {
    equal(cssVendor.supportedProperty('display'), 'display')
})

test('known property prefixed', function () {
    var prop = cssVendor.supportedProperty('animation-name')
    equal(prop, cssVendor.prefix.css + 'animation-name')
})

test('unknown property', function () {
    equal(cssVendor.supportedProperty('xxx'), false)
})

QUnit.module('selector support')

test('normal selector', function () {
    equal(cssVendor.supportedSelector('.a .b'), '.a .b')
})

test('known at-rule selector', function () {
    var importStyle = '@import url(test.css)'
    equal(cssVendor.supportedSelector(importStyle), importStyle)
})

test('known prefixed at-rule selector', function () {
    // There is no longer a known prefixed rule for all browsers,
    // but checking in window.CSSRule is still a working heuristic for @keyframes
    var selector = cssVendor.supportedSelector('@keyframes animation-name')
    var prefix = ('KEYFRAMES_RULE' in window.CSSRule) ? '' : cssVendor.prefix.css

    equal(selector, '@' + prefix + 'keyframes animation-name')
})

QUnit.module('value support')

test('known value', function () {
    var value = cssVendor.supportedValue('display', 'none')
    equal(value, 'none')
})

test('known value prefixed', function () {
    var value = cssVendor.supportedValue('display', 'flex')
    if (value == 'flex') {
        ok(true, 'unprefixed is supported')
    } else {
        equal(value, cssVendor.prefix.css + 'flex', 'prefixed supported')
    }
})

test('unknown value', function () {
    equal(cssVendor.supportedValue('display', 'xxx'), false)
})
