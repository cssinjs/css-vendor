import expect from 'expect.js'
import supportedKeyframes from './supported-keyframes'

describe('css-vendor', () => {
  describe('.supportedKeyframes()', () => {
    it('should not prefix keyframe at-rule', () => {
      expect(supportedKeyframes('ms')).to.be(false)
    })

    it('should prefix keyframe at-rule', () => {
      expect(supportedKeyframes('Webkit')).to.be(true)
    })
  })
})
