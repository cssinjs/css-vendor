import prefix from '../prefix';

// Support transition prop syntax.
// https://caniuse.com/#search=transition
export default {
  noPrefill: ['transition'],
  supportedProperty: (prop, style, options) => {
    if (prop !== 'transition') return false;
    if (options.transition) {
      return prop;
    }
    return prefix.css + prop;
  },
};
