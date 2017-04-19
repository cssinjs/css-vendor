import prefix from '../prefix'
import pascalize from '../pascalize'

const propMap = {
  'flex-grow': 'flex-positive',
  'flex-shrink': 'flex-negative',
  'flex-basis': 'flex-preferred-size',
  'justify-content': 'flex-pack',
  order: 'flex-order',
  'align-items': 'flex-align',
  'align-content': 'flex-line-pack',
  // align-self is handled by `align-self` plugin.
}

const propKeys = Object.keys(propMap)

// Support old flex spec from 2012.
export default {
  supportedProperty: (prop, style) => {
    if (propKeys.indexOf(prop) > -1) {
      const newProp = propMap[prop]
      return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
    }
    return false
  }
}
