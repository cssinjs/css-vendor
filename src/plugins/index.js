import appearence from './appearence'
import transform from './transform'
import transition from './transition'
import scrollSnap from './scroll-snap'
import mask from './mask'
import writingMode from './writing-mode'
import clipPath from './clip-path'
import colorAdjust from './color-adjust'
import filter from './filter'
import unprefixed from './unprefixed'
import prefixed from './prefixed'
import inlineLogicalOld from './inline-logical-old'
import maskBorderOld from './mask-border-old'
import breakPropsOld from './break-props-old'
import flex2009 from './flex-2009'
import flex2012 from './flex-2012'

const plugins = [
  appearence,
  transform,
  transition,
  scrollSnap,
  mask,
  writingMode,
  clipPath,
  colorAdjust,
  filter,
  unprefixed,
  prefixed,
  flex2012,
  flex2009,
  inlineLogicalOld,
  maskBorderOld,
  breakPropsOld
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
