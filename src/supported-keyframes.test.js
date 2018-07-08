import expect from 'expect.js'
import supportedKeyframes from './supported-keyframes'

describe('css-vendor', () => {
  describe('.supportedKeyframes()', () => {
    it('should not prefix keyframe at-rule', () => {
      // eslint-disable-next-line no-underscore-dangle
      supportedKeyframes.__Rewire__('prefix', {
        js: 'ms',
        css: '-ms-'
      })
      expect(supportedKeyframes()).to.be('@')
      // eslint-disable-next-line no-underscore-dangle
      supportedKeyframes.__ResetDependency__('prefix')
    })

    it('should prefix keyframe at-rule', () => {
      expect(supportedKeyframes()).to.be('@-webkit-')
    })
  })
})
