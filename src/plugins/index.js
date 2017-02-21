const plugins = [
]

export const supportedPropertyPlugins = plugins
  .filter(p => p.supportedProperty)
  .map(p => p.supportedProperty)

