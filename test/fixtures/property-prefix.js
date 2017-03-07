import {getSupport, currentBrowser, getVersionIndex} from 'caniuse-support'
import autoprefixer from 'autoprefixer'
import data from 'autoprefixer/data/prefixes'
import postcssJs from 'postcss-js'
import {dashify} from '../utils'

const browserQuery = `${currentBrowser.id} ${getVersionIndex(currentBrowser)}`
const ap = autoprefixer({browsers: browserQuery})
const prefixer = postcssJs.sync([ap])

const skipProperties = [
  // caniuse doesn't cover this property and spec might drop this: https://www.w3.org/TR/css-fonts-3/.
  'font-language-override',
  // Lack of caniuse data. See https://github.com/Fyrd/caniuse/issues/2116
  'font-variant-ligatures',
]

const flexOldUnsupported = ['flex-shrink', 'flex-basis', 'flex-wrap', 'align-self', 'align-content']
const flexOldFFUnsupported = ['flex-wrap', 'flex-flow', 'align-content']
const msSnapPointsUnsupported = ['scroll-snap-coordinate', 'scroll-snap-destination']

// No support in caniuse db means no support for the spec, but
// no support in css-vendor means no browser support at all for the particular property,
// therefore we cannot test with the caniuse data for these cases.
const isExcluded = o =>
    o.level === 'none' ||
    // http://caniuse.com/#feat=object-fit
    o.property === 'object-position' && o.notes.indexOf(1) > -1 ||
    // http://caniuse.com/#feat=multicolumn
    // https://bugzilla.mozilla.org/show_bug.cgi?id=616436
    o.property === 'column-span' && currentBrowser.id === 'firefox' ||
    o.property === 'column-fill' && o.notes.indexOf(2) > -1 ||
    // http://caniuse.com/#feat=css-masks
    /^mask-/.test(o.property) && o.notes.indexOf(2) > -1 ||
    /^mask-border-/.test(o.property) && o.notes.indexOf(3) > -1 ||
    // http://caniuse.com/#feat=text-decoration
    o.property === 'text-decoration-skip' && o.notes.indexOf(4) > -1 ||
    o.property === 'text-decoration-style' && o.notes.indexOf(2) > -1 ||
    // http://caniuse.com/#feat=css-crisp-edges
    o.property === 'image-rendering' && o.notes.indexOf(2) > -1 ||
    // http://caniuse.com/#feat=css-logical-props
    /^(border|margin|padding)-block-(start|end)/.test(o.property) && o.notes.indexOf(1) > -1 ||
    // http://caniuse.com/#feat=flexbox
    flexOldUnsupported.indexOf(o.property) > -1 && o.notes.indexOf(1) > -1 ||
    flexOldFFUnsupported.indexOf(o.property) > -1 && o.notes.indexOf(3) > -1 ||
    // Autoprefixer Quirk: prefixes writing-mode for ie even though it is not necessary
    o.property === 'writing-mode' && currentBrowser.id === 'ie' ||
    // http://caniuse.com/#feat=css-snappoints
    msSnapPointsUnsupported.indexOf(o.property) > -1 && o.notes.indexOf(6) > -1 ||
    // http://caniuse.com/#feat=css-regions
    o.property === 'region-fragment' && o.notes.indexOf(2) > -1

function generateFixture() {
  const fixture = {}
  Object.keys(data).
    // Filters autoprefixer data to include only property prefix related entries.
    filter(s => /^[^:@].*$/.test(s)).
    filter(s => data[s].props === undefined).
    filter(s => skipProperties.indexOf(s) < 0).
    // TODO: Remove the following line when this is resolved: https://github.com/Fyrd/caniuse/issues/3070.
    filter(s => ['css3-cursors-grab', 'css-text-spacing'].indexOf(data[s].feature) < 0).
    map(s => ({property: s, feature: data[s].feature, ...getSupport(data[s].feature)})).
    filter(o => !isExcluded(o)).
    forEach(o => {
      let props = Object.keys(prefixer({[o.property]: ''})).map(dashify)
      // Remove unprefixed prop (last in array) when prefix is needed.
      props = props.length > 1 ? props.slice(0, props.length - 1) : props
      fixture[o.property] = props.length === 1 ? props[0] : props
    })
  return fixture
}

export default generateFixture()

