import maskBorderOld from "./mask-border-old"

const plugins = [
  maskBorderOld,
]

export const supportedPropertyPlugins = plugins
  .filter(p => p.supportedProperty)
  .map(p => p.supportedProperty)

