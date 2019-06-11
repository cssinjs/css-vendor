import expect from 'expect.js'
import {detectBrowser} from 'caniuse-support'

import prefix from './prefix'
import supportedProperty from './supported-property'
import propertyPrefixFixture from '../tests/fixtures'

const currentBrowser = detectBrowser(window.navigator.userAgent)

describe('css-vendor', () => {
  describe('.supportedProperty()', () => {
    it('should not prefix', () => {
      expect(supportedProperty('display')).to.be('display')
    })

    it('should not prefix', () => {
      expect(supportedProperty('--padding-start')).to.be('--padding-start')
    })

    const opts = {multiple: true}
    for (const property in propertyPrefixFixture) {
      it(`should prefix ${property} if needed [${currentBrowser.id} ${currentBrowser.version}]`, () =>
        expect(supportedProperty(property, opts)).to.eql(propertyPrefixFixture[property]))
    }

    it('should prefix writing-mode if needed', () => {
      let isPrefixed = false
      if (prefix.js === 'Webkit' || prefix.js === 'ms') {
        isPrefixed = true
      }
      expect(supportedProperty('writing-mode')).to.be(`${isPrefixed ? prefix.css : ''}writing-mode`)
    })

    it('should return false when property is unsupported', () => {
      expect(supportedProperty('xxx')).to.be(false)
    })
  })
})
