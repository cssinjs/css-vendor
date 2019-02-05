import prefix from '../prefix';

// Support overscroll-behavior props syntax.
// https://caniuse.com/#search=overscroll-behavior
export default {
  supportedProperty: (prop) => {
    if (prop !== 'overscroll-behavior') return false;
    if (prefix.js === 'ms') {
      return `${prefix.css}scroll-chaining`;
    }
    return prop;
  },
};
