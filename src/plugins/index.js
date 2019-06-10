import appearence from './appearence'
import breakPropsOld from './break-props-old'
import colorAdjust from './color-adjust'
import flex2009 from './flex-2009'
import flex2012 from './flex-2012'
import inlineLogicalOld from './inline-logical-old'
import mask from './mask'
import overscrollBehavior from './overscroll-behavior'
import prefixed from './prefixed'
import scrollSnap from './scroll-snap'
import textDecorationSkipInk from './text-decoration-skip-ink'
import textOrientation from './text-orientation'
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
//    flex2012,
//    flex2009
// ]
// Plugins without 'noPrefill' value, going last.
// 'flex-*' plugins should be at the bottom.
// 'flex2009' going after 'flex2012'.
// 'prefixed' going after 'unprefixed'
const plugins = [
  appearence,
  colorAdjust,
  mask,
  textDecorationSkipInk,
  textOrientation,
  transform,
  transition,
  writingMode,
  breakPropsOld,
  inlineLogicalOld,
  unprefixed,
  prefixed,
  scrollSnap,
  overscrollBehavior,
  flex2012,
  flex2009
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
