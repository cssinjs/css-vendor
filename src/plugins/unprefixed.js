import camelize from '../camelize'

// Test if property is supported as it is.
// Camelization is required because we can't test using
// css syntax for e.g. in FF.
export default {
  supportedProperty: (prop, style) => (camelize(prop) in style ? prop : false),
}
