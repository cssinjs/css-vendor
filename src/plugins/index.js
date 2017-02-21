import blockLogicalOld from "./block-logical-old"
import inlineLogicalOld from "./inline-logical-old"
import maskBorderOld from "./mask-border-old"

const plugins = [
  blockLogicalOld,
  inlineLogicalOld,
  maskBorderOld,
]

export const supportedPropertyPlugins = plugins
  .filter(p => p.supportedProperty)
  .map(p => p.supportedProperty)

