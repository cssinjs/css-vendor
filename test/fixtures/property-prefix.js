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

const isNotSupported = (o) =>
    o.level === 'none' ||
    // http://caniuse.com/#feat=object-fit
    o.property === 'object-position' && o.notes.indexOf(1) > -1 ||
    // http://caniuse.com/#feat=multicolumn
    // https://bugzilla.mozilla.org/show_bug.cgi?id=616436
    o.property === 'column-span' && currentBrowser.id === 'firefox' ||
    o.property === 'column-fill' && o.notes.indexOf(2) > -1 ||
    // http://caniuse.com/#feat=css-masks
    o.property.match(/^mask-/) && o.notes.indexOf(2) > -1 ||
    // http://caniuse.com/#feat=text-decoration
    o.property === 'text-decoration-skip' && o.notes.indexOf(4) > -1 ||
    o.property === 'text-decoration-style' && o.notes.indexOf(2) > -1

function generateFixture() {
  const fixture = {}
  Object.keys(data).
    // Filters autoprefixer data to include only property prefix related entries.
    filter(s => s.match(/^[^:@].*$/g)).
    filter(s => data[s].props === undefined).
    filter(s => skipProperties.indexOf(s) < 0).
    // TODO: Remove the following line when this is resolved: https://github.com/Fyrd/caniuse/issues/3070.
    filter(s => ['css3-cursors-grab', 'css-text-spacing'].indexOf(data[s].feature) < 0).
    map(s => ({property: s, feature: data[s].feature, ...getSupport(data[s].feature)})).
    // No support in caniuse db means no support for the spec, but
    // no support in css-vendor means no browser support at all for the particular property,
    // therefore we cannot test with the caniuse data for these cases.
    filter(o => !isNotSupported(o)).
    forEach(o => {
      fixture[o.property] = dashify(Object.keys(prefixer({[o.property]: ''}))[0])
    })
  return fixture
}

export default generateFixture()

