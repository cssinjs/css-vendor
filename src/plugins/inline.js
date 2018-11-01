// Support for inline props syntax. e.g. border-inline-end, margin-inline-start
// https://caniuse.com/#feat=css-logical-props
export default {
  supportedProperty: (prop) => {
    if (!prop.includes('inline')) return false
    return prop
  }
}
