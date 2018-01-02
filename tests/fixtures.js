import {getSupport, currentBrowser, getVersionIndex} from 'caniuse-support'
import autoprefixer from 'autoprefixer'
import data from 'autoprefixer/data/prefixes'
import postcssJs from 'postcss-js'

const browserQuery = `${currentBrowser.id} ${getVersionIndex(currentBrowser)}`
const ap = autoprefixer({browsers: browserQuery})
const prefixer = postcssJs.sync([ap])

const skipProperties = [
  // caniuse doesn't cover this property and spec might drop this: https://www.w3.org/TR/css-fonts-3/.
  'font-language-override',
  // caniuse doesn't cover those properties
  'grid-row-align',
  'grid-column-align',
  // Lack of caniuse data. See https://github.com/Fyrd/caniuse/issues/2116
  'font-variant-ligatures'
]

const notDescribedCanIUseProps = ['css3-cursors-grab', 'css-text-spacing']

const gridProps = [
  'grid-template-columns', 'grid-template-rows',
  'grid-row-start', 'grid-column-start',
  'grid-row-end', 'grid-column-end',
  'grid-row', 'grid-column', 'grid-area',
  'grid-template', 'grid-template-areas'
]
const flexOldUnsupported = ['flex-shrink', 'flex-basis', 'flex-wrap', 'align-self', 'align-content']
const flexOldFFUnsupported = ['flex-wrap', 'flex-flow', 'align-content']
const msSnapPointsUnsupported = ['scroll-snap-coordinate', 'scroll-snap-destination']
const breakProps = ['break-before', 'break-inside', 'break-after']

// No support in caniuse db means no support for the spec, but
// no support in css-vendor means no browser support at all for the particular property,
// therefore we cannot test with the caniuse data for these cases.
const isExcluded = o =>
  o.level === 'none' ||
  // http://caniuse.com/#feat=object-fit
  o.property === 'object-position' ||
  // http://caniuse.com/#feat=multicolumn
  // https://bugzilla.mozilla.org/show_bug.cgi?id=616436
  (o.property === 'column-span' && currentBrowser.id === 'firefox') ||
  o.property === 'column-fill' ||
  // http://caniuse.com/#feat=css-masks
  /^mask-/.test(o.property) ||
  // http://caniuse.com/#feat=text-decoration
  o.property === 'text-decoration' ||
  o.property === 'text-decoration-skip' ||
  o.property === 'text-decoration-style' ||
  // http://caniuse.com/#feat=css-crisp-edges
  o.property === 'image-rendering' ||
  // http://caniuse.com/#feat=css-logical-props
  /^(border|margin|padding)-block-(start|end)/.test(o.property) ||
  // http://caniuse.com/#feat=flexbox
  flexOldUnsupported.indexOf(o.property) > -1 ||
  flexOldFFUnsupported.indexOf(o.property) > -1 ||
  skipProperties.indexOf(o.property) > -1 ||
  gridProps.indexOf(o.property) > -1 ||
  // Autoprefixer Quirk: prefixes writing-mode for ie even though it is not necessary
  o.property === 'writing-mode' ||
  // http://caniuse.com/#feat=css-snappoints
  msSnapPointsUnsupported.indexOf(o.property) > -1 ||
  // http://caniuse.com/#feat=css-regions
  o.property === 'region-fragment' ||
  breakProps.indexOf(o.property) > -1

// Some properties need a certain value, so autoprefixer will prefix them.
const propertyValue = p => (/^grid-(column|row)-end/.test(p) ? 'span 3' : '')

const dashify = str =>
  str.replace(/([A-Z])/g, '-$1')
    .replace(/^ms-/, '-ms-')
    .toLowerCase()

function generateFixture() {
  const fixture = {}
  Object.keys(data)
    // Filters autoprefixer data to include only property prefix related entries.
    .filter(s =>
      /^[^:@].*$/.test(s) &&
      data[s].props === undefined &&
      notDescribedCanIUseProps.indexOf(data[s].feature) < 0)
    .map(s => ({property: s, feature: data[s].feature, ...getSupport(data[s].feature)}))
    .filter(o => !isExcluded(o))
    .forEach((o) => {
      let props = Object.keys(prefixer({[o.property]: propertyValue(o.property)})).map(dashify)
      // Remove unprefixed prop (last in array) when prefix is needed.
      props = props.length > 1 ? props.slice(0, props.length - 1) : props
      fixture[o.property] = props.length === 1 ? props[0] : props
    })
  return fixture
}

export default generateFixture()
