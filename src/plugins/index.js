import appearence from './appearence'
import breakPropsOld from './break-props-old'
import clipPath from './clip-path'
import colorAdjust from './color-adjust'
import filter from './filter'
import flex2009 from './flex-2009'
import flex2012 from './flex-2012'
import inlineLogicalOld from './inline-logical-old'
import mask from './mask'
import prefixed from './prefixed'
import scrollSnap from './scroll-snap'
import scrollChaining from './scroll-chaining'
import transform from './transform'
import transition from './transition'
import unprefixed from './unprefixed'
import writingMode from './writing-mode'

// Please, keep order plugins:
// plugins = [
//   ...plugins,
//    breakPropsOld,
//    inlineLogicalOld,
//    unprefixed,
//    prefixed,
//    scrollSnap,
//    scrollChaining,
//    flex2012,
//    flex2009
// ]
// Plugins without 'noPrefill' value, going last.
// 'flex-*' plugins should be at the bottom.
// 'flex2009' going after 'flex2012'.
// 'prefixed' going after 'unprefixed'
const plugins = [
  appearence,
  transform,
  transition,
  mask,
  writingMode,
  clipPath,
  colorAdjust,
  filter,
  breakPropsOld,
  inlineLogicalOld,
  unprefixed,
  prefixed,
  scrollSnap,
  scrollChaining,
  flex2012,
  flex2009,
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
