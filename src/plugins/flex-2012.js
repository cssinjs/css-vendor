import prefix from '../prefix'
import pascalize from '../utils/pascalize'

const propMap = {
  'flex-grow': 'flex-positive',
  'flex-shrink': 'flex-negative',
  'flex-basis': 'flex-preferred-size',
  'justify-content': 'flex-pack',
  order: 'flex-order',
  'align-items': 'flex-align',
  'align-content': 'flex-line-pack',
  // 'align-self' is handled by 'align-self' plugin.
}

// Support old flex spec from 2012.
export default {
  supportedProperty: (prop, style) => {
    const newProp = propMap[prop]
    if (!newProp) return false
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false
  }
}
