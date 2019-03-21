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

    const {level, needPrefix} = getSupport('flexbox', detectBrowser(window.navigator.userAgent))
    if (level === 'full') {
      it('should prefix if needed for flex value', () => {
        const value = needPrefix ? `${prefix.css}flex` : 'flex'
        expect(supportedValue('display', 'flex')).to.be(value)
      })
    } else {
      it.skip('flex is not fully supported in the current browser')
    }

    it('should return false when value is unknown', () => {
      expect(supportedValue('display', 'xxx')).to.be(false)
    })

    it('should return false when property is "content"', () => {
      expect(supportedValue('content', 'bar')).to.be(false)
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

    it('should not break a complex transition value', () => {
      const value = 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
      expect(supportedValue('transition', value)).to.be(value)
    })
  })
})
