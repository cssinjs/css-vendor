import prefix from '../prefix';
import pascalize from '../utils/pascalize';
import camelize from '../utils/camelize';

// Mask property support cannot detect directly in WebKit browsers,
// but we can use a longhand property instead.
// https://caniuse.com/#search=mask
export default {
  noPrefill: ['mask'],
  supportedProperty: (prop, style) => {
    if (!/^mask/.test(prop)) return false;
    if (prefix.js === 'Webkit') {
      const longhand = 'mask-image';
      if (camelize(longhand) in style) {
        return prop;
      }
      if (prefix.js + pascalize(longhand) in style) {
        return prefix.css + prop;
      }
    }
    return prop;
  },
};
