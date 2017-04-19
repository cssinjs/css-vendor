import prefix from '../prefix'
import pascalize from '../pascalize'

const propMap = {
  'grid-template-columns': 'grid-columns',
  'grid-template-rows': 'grid-rows',
  'grid-column-start': 'grid-column',
  'grid-column-end': 'grid-column-span',
  'grid-row-start': 'grid-row',
  'grid-row-end': 'grid-row-span',
  'justify-items': 'grid-column-align',
  // align-self is handled by `align-self` plugin.
}

const propKeys = Object.keys(propMap)

// Support old grid spec from 2011.
export default {
  supportedProperty: (prop, style) => {
    if (propKeys.indexOf(prop) > -1) {
      const newProp = propMap[prop]
      return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
    }
    return false
  }
}
