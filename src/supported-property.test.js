import expect from 'expect.js'
import {currentBrowser} from 'caniuse-support'

import prefix from './prefix'
import supportedProperty from './supported-property'
import propertyPrefixFixture from '../tests/fixtures'

describe('css-vendor', () => {
  describe('.supportedProperty()', () => {
    it('should not prefix', () => {
      expect(supportedProperty('display')).to.be('display')
    })

    const opts = {multiple: true}
    for (const property in propertyPrefixFixture) {
      it(`should prefix ${property} if needed [${currentBrowser.id} ${currentBrowser.version}]`, () => (
        expect(supportedProperty(property, opts)).to.eql(propertyPrefixFixture[property])
      ))
    }

    it('should prefix writing-mode', () => {
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
