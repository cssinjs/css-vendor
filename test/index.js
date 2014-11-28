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
    var prop = cssVendor.supportedProperty('animation')
    var prefixedProp = cssVendor.prefix.css + 'animation'
    equal(prop, prefixedProp)
})

test('unknown property', function () {
    equal(cssVendor.supportedProperty('xxx'), false)
})
