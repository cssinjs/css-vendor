import prefix from '../prefix'
import pascalize from '../utils/pascalize'

const reduce = (r, v) => (r ? [r, v] : v)
const gridProp = 'grid-row-align'
const flexProp = 'flex-item-align'

// Support flexbox 2012 and grid 2011 syntax.
export default {
  noPrefill: ['align-self'],
  supportedProperty: (prop, style) => {
    let result = false
    if (prop === 'align-self') {
      // flexbox 2012
      if (!(prop in style) && prefix.js + pascalize(flexProp) in style) {
        result = reduce(result, prefix.css + flexProp)
      }
      // grid 2011
      if (!('gridRowEnd' in style) && prefix.js + pascalize(gridProp) in style) {
        result = reduce(result, prefix.css + gridProp)
      }
    }
    return result
  },
}
