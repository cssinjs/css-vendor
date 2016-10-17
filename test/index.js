'use strict'

QUnit.module('vendor prefix')

//var cssVendor = window.cssVendor.default
var test = QUnit.test

test('finding css vendor prefix', function (assert) {
    assert.equal(typeof cssVendor.prefix.css, 'string', 'is string')
    assert.equal(cssVendor.prefix.css[0], '-', 'starts with dash')
    assert.equal(cssVendor.prefix.css[cssVendor.prefix.css.length-1], '-', 'ends with dash')
    assert.ok(cssVendor.prefix.css.length >= 3, 'min length ok')
})

test('js vendor prefix is defined', function (assert) {
    assert.equal(typeof cssVendor.prefix.js, 'string', 'is string')
})

QUnit.module('property support')

test('known property', function (assert) {
    assert.equal(cssVendor.supportedProperty('display'), 'display')
})

test('known property prefixed', function (assert) {
    var prop = cssVendor.supportedProperty('animation')
    assert.equal(prop, cssVendor.prefix.css + 'animation')
})

test('unknown property', function (assert) {
    assert.equal(cssVendor.supportedProperty('xxx'), false)
})

QUnit.module('value support')

test('known value', function (assert) {
    var value = cssVendor.supportedValue('display', 'none')
    assert.equal(value, 'none')
})

test('known value prefixed', function (assert) {
    var value = cssVendor.supportedValue('display', 'flex')
    if (value == 'flex') {
        assert.ok(true, 'unprefixed is supported')
    } else {
        assert.equal(value, cssVendor.prefix.css + 'flex', 'prefixed supported')
    }
})

test('unknown value', function (assert) {
    assert.equal(cssVendor.supportedValue('display', 'xxx'), false)
})

test('bad "content" value', function (assert) {
    assert.equal(cssVendor.supportedValue('content', 'bar'), false)
})
