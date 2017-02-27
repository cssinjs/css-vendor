import unprefixed from './unprefixed'
import prefixed from './prefixed'
import blockLogicalOld from './block-logical-old'
import inlineLogicalOld from './inline-logical-old'
import maskBorderOld from './mask-border-old'
import breakPropsOld from './break-props-old'

const plugins = [
  unprefixed,
  prefixed,
  blockLogicalOld,
  inlineLogicalOld,
  maskBorderOld,
  breakPropsOld,
]

export const propertyDetectors = plugins
  .filter(p => p.supportedProperty)
  .map(p => p.supportedProperty)

export const noPrefill = plugins
  .filter(p => p.noPrefill)
  .reduce((a, p) => {
    a.push(...p.noPrefill)
    return a
  }, [])
