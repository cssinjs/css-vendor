import expect from 'expect.js';
import supportedKeyframes from './supported-keyframes';

describe('css-vendor', () => {
  describe('.supportedKeyframes()', () => {
    it('should not prefix keyframe at-rule', () => {
      // eslint-disable-next-line no-underscore-dangle
      supportedKeyframes.__Rewire__('prefix', {
        js: 'ms',
        css: '-ms-',
      });
      expect(supportedKeyframes('@keyframes a')).to.be('@keyframes a');
    });

    it('should prefix keyframe at-rule', () => {
      // eslint-disable-next-line no-underscore-dangle
      supportedKeyframes.__Rewire__('prefix', {
        js: 'Webkit',
        css: '-webkit-',
      });
      expect(supportedKeyframes('@keyframes a')).to.be('@-webkit-keyframes a');
      // eslint-disable-next-line no-underscore-dangle
      supportedKeyframes.__ResetDependency__('prefix');
    });

    it('should return keyframe at-rule as it is', () => {
      expect(supportedKeyframes('@-webkit-keyframes a')).to.be('@-webkit-keyframes a');
    });
  });
});
