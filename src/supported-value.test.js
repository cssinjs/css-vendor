import expect from 'expect.js'
import {getSupport, detectBrowser} from 'caniuse-support'

import propertyPrefixFixture from '../tests/fixtures'
import prefix from './prefix'
import supportedValue from './supported-value'

describe('css-vendor', () => {
  describe('.supportedValue()', () => {
    it('should not prefix a simple value', () => {
      expect(supportedValue('display', 'none')).to.be('none')
    })

    it('should not prefix a complex value', () => {
      const value = 'rgba(255, 255, 255, 1.0)'
      expect(supportedValue('color', value)).to.be(value)
    })

    const {level: flexboxLevel, needPrefix: flexboxNeedPrefix} = getSupport(
      'flexbox',
      detectBrowser(window.navigator.userAgent)
    )
    if (flexboxLevel === 'full') {
      it('should prefix if needed for flex value', () => {
        const value = flexboxNeedPrefix ? `${prefix.css}flex` : 'flex'
        expect(supportedValue('display', 'flex')).to.be(value)
      })
    } else {
      it.skip('flex is not fully supported in the current browser')
    }

    it('should return false when value is unknown', () => {
      expect(supportedValue('display', 'xxx')).to.be(false)
    })

    it('should return value when property is "content"', () => {
      expect(supportedValue('content', 'bar')).to.be('bar')
    })

    it('should return known transform value prefixed', () => {
      expect(supportedValue('transition', 'all 100ms ease, transform 200ms linear')).to.eql(
        `all 100ms ease, ${propertyPrefixFixture.transform} 200ms linear`
      )
    })

    it('should return dashed property value as it is', () => {
      expect(supportedValue('transition', 'max-height 300ms ease-in-out')).to.eql(
        'max-height 300ms ease-in-out'
      )
    })

    it('should return custom CSS variable for transition property as it is', () => {
      expect(supportedValue('transition', 'var(--something)')).to.eql('var(--something)')
    })

    it('should return custom CSS variables for transition property as they are', () => {
      expect(supportedValue('transition', 'width var(--width), height var(--height)')).to.eql(
        'width var(--width), height var(--height)'
      )
    })

    it('should not break a complex transition value', () => {
      const value = 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
      expect(supportedValue('transition', value)).to.be(value)
    })

    it('should prefix if needed for sticky value', () => {
      const {needPrefix: stickyNeedPrefix} = getSupport(
        'css-sticky',
        detectBrowser(window.navigator.userAgent)
      )
      const value = stickyNeedPrefix ? `${prefix.css}sticky` : 'sticky'
      expect(supportedValue('position', 'sticky')).to.be(
        prefix.js === 'ms' && prefix.browser !== 'edge' ? false : value
      )
    })
  })
})
