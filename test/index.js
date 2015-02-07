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
    var prop = cssVendor.supportedProperty('animation')
    equal(prop, cssVendor.prefix.css + 'animation')
})

test('unknown property', function () {
    equal(cssVendor.supportedProperty('xxx'), false)
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
