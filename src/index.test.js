/* eslint-disable func-names */

import expect from 'expect.js'
import {getSupport, currentBrowser} from 'caniuse-support'

import {prefix, supportedProperty, supportedValue} from './index'
import propertyPrefixFixture from '../test/fixtures/property-prefix'

const msg = `Detected browser: ${currentBrowser.id} ${currentBrowser.version}`
console.log(msg) // eslint-disable-line no-console

describe('css-vendor', () => {
  describe('.prefix', () => {
    it('should be correct for .css', () => {
      const {css} = prefix
      expect(css).to.be.a('string')
      expect(css[0]).to.be('-')
      expect(css[css.length - 1]).to.be('-')
      expect(css.length >= 3).to.be(true)
    })

    it('shoud be not empty for .js', () => {
      expect(prefix.js).to.be.a('string')
    })
  })

  describe('.supportedProperty()', () => {
    it('should not prefix', () => {
      expect(supportedProperty('display')).to.be('display')
    })

    const opts = {multiple: true}
    for (const property in propertyPrefixFixture) {
      it(`should prefix ${property} if needed [${currentBrowser.id} ${currentBrowser.version}]`,
        () => expect(supportedProperty(property, opts)).to.eql(propertyPrefixFixture[property]))
    }

    it('should prefix writing-mode', () => {
      let isPrefixed = false
      if (prefix.js === 'Webkit' || prefix.js === 'ms') {
        isPrefixed = true
      }
      expect(supportedProperty('writing-mode')).to.be(`${isPrefixed ? prefix.css : ''}writing-mode`)
    })

    it('should return false', () => {
      expect(supportedProperty('xxx')).to.be(false)
    })
  })

  describe('.supportedValue()', () => {
    it('should not prefix a simple value', () => {
      expect(supportedValue('display', 'none')).to.be('none')
    })

    it('should not prefix a complex value', () => {
      const value = 'rgba(255, 255, 255, 1.0)'
      expect(supportedValue('color', value)).to.be(value)
    })

    it('should prefix if needed', function () {
      const {level, needPrefix} = getSupport('flexbox')
      if (level !== 'full') this.skip()
      const value = needPrefix ? `${prefix.css}flex` : 'flex'
      expect(supportedValue('display', 'flex')).to.be(value)
    })

    it('should return false for unknown value', () => {
      expect(supportedValue('display', 'xxx')).to.be(false)
    })

    it('should return false for "content" value', () => {
      expect(supportedValue('content', 'bar')).to.be(false)
    })

    it('known transition value as array prefixed', () => {
      expect(supportedValue('transition', ['all 100ms ease', 'transform 200ms linear']))
        .to.eql(['all 100ms ease', `${propertyPrefixFixture.transform} 200ms linear`])
    })

    it('known transition value as array with important keyword prefixed', () => {
      expect(supportedValue('transition', [
        'all 100ms ease',
        'transform 200ms linear',
        '!important'
      ]))
        .to.eql([
          'all 100ms ease',
          `${propertyPrefixFixture.transform} 200ms linear`,
          '!important'
        ])
    })

    it('known transition value as two dimensional array prefixed', () => {
      expect(supportedValue('transition', [['all', '100ms', 'ease'],
      ['transform', '200ms', 'linear']]))
        .to.eql([['all', '100ms', 'ease'], [propertyPrefixFixture.transform, '200ms', 'linear']])
    })

    it('known transition value as two dimensional array with important keyword prefixed', () => {
      expect(supportedValue('transition', [
        ['all', '100ms', 'ease'],
        ['transform', '200ms', 'linear'],
        '!important'
      ]))
        .to.eql([
          ['all', '100ms', 'ease'],
          [propertyPrefixFixture.transform, '200ms', 'linear'],
          '!important'
        ])
    })

    it('known transition-property value prefixed', () => {
      expect(supportedValue('transition-property', 'all, transform'))
        .to.be(`all, ${propertyPrefixFixture.transform}`)
    })
  })
})
