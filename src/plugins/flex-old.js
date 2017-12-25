import prefix from '../prefix'
import pascalize from '../utils/pascalize'

const propMap = {
  flex: 'box-flex',
  'flex-grow': 'box-flex',
  'flex-direction': ['box-orient', 'box-direction'],
  order: 'box-ordinal-group',
  'align-items': 'box-align',
  'flex-flow': ['box-orient', 'box-direction'],
  'justify-content': 'box-pack',
}

const propKeys = Object.keys(propMap)

const prefixCss = p => prefix.css + p

// Support old flex spec from 2009.
export default {
  supportedProperty: (prop, style, {multiple}) => {
    if (propKeys.indexOf(prop) > -1) {
      const newProp = propMap[prop]
      if (!Array.isArray(newProp)) {
        return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
      }
      if (!multiple) return false
      for (let i = 0; i < newProp.length; i++) {
        if (!(prefix.js + pascalize(newProp[0]) in style)) {
          return false
        }
      }
      return newProp.map(prefixCss)
    }
    return false
  }
}
