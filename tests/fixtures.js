import {getSupport, detectBrowser, getVersionIndex} from 'caniuse-support'
import autoprefixer from 'autoprefixer'
import data from 'autoprefixer/data/prefixes'
import postcssJs from 'postcss-js'

const currentBrowser = detectBrowser(window.navigator.userAgent)

const browserQuery = `${currentBrowser.id} ${getVersionIndex(currentBrowser)}`
const ap = autoprefixer({overrideBrowserslist: browserQuery})
const prefixer = postcssJs.sync([ap])

const skipProperties = [
  // Caniuse doesn't cover this property and spec might drop this: https://www.w3.org/TR/css-fonts-3/.
  'font-language-override',
  // Caniuse doesn't cover those properties.
  'grid-row-align',
  'grid-column-align',
  // Lack of caniuse data. See https://github.com/Fyrd/caniuse/issues/2116.
  'font-variant-ligatures'
]

const notDescribedCanIUseProps = ['css3-cursors-grab', 'css-text-spacing']

const gridProps = [
  'grid-template-columns',
  'grid-template-rows',
  'grid-row-start',
  'grid-column-start',
  'grid-row-end',
  'grid-column-end',
  'grid-row',
  'grid-column',
  'grid-area',
  'grid-template',
  'grid-template-areas'
]
const flexOldUnsupported = ['flex-shrink', 'flex-basis', 'flex-wrap', 'align-self', 'align-content']
const flexOldFFUnsupported = ['flex-wrap', 'flex-flow', 'align-content']
const msSnapPointsUnsupported = ['scroll-snap-coordinate', 'scroll-snap-destination']
const breakProps = ['break-before', 'break-inside', 'break-after']

// In caniuse db, no supported value/prop means spec does not support it, but
// no support in css-vendor implies no browser support at all for the
// particular property. Therefore we cannot test the caniuse data for these cases.
const isExcluded = o =>
  o.level === 'none' ||
  // https://caniuse.com/#search=object-fit
  o.property === 'object-position' ||
  // https://caniuse.com/#search=multicolumn
  // https://bugzilla.mozilla.org/show_bug.cgi?id=616436
  (o.property === 'column-span' && currentBrowser.id === 'firefox') ||
  o.property === 'column-fill' ||
  // https://caniuse.com/#search=css-masks
  /^mask-/.test(o.property) ||
  // https://caniuse.com/#search=text-decoration
  o.property === 'text-decoration' ||
  o.property === 'text-decoration-skip' ||
  o.property === 'text-decoration-style' ||
  // https://caniuse.com/#search=css-crisp-edges
  o.property === 'image-rendering' ||
  // https://caniuse.com/#search=css-logical-props
  /^(border|margin|padding)-(block|inline)-(start|end)/.test(o.property) ||
  // https://caniuse.com/#search=flexbox
  flexOldUnsupported.indexOf(o.property) > -1 ||
  flexOldFFUnsupported.indexOf(o.property) > -1 ||
  skipProperties.indexOf(o.property) > -1 ||
  // https://caniuse.com/#search=grid
  gridProps.indexOf(o.property) > -1 ||
  // css-vendor will prefix writing-mode anyway
  o.property === 'writing-mode' ||
  // https://caniuse.com/#search=css-snappoints
  msSnapPointsUnsupported.indexOf(o.property) > -1 ||
  // https://caniuse.com/#search=css-regions
  o.property === 'region-fragment' ||
  // We do not detect browser version or platform. We can't support
  // font-kerning, clip-path, becayse they have different prefix rules for
  // same browsers family (like Webkit) on different platforms.
  // https://caniuse.com/#search=font-kerning
  // https://caniuse.com/#search=clip-path
  o.property === 'font-kerning' ||
  o.property === 'clip-path' ||
  // Something similar happened for a filter. Prefix rules for this
  // property changed within the time (Chrome)
  // https://caniuse.com/#search=filter
  o.property === 'filter' ||
  o.property === 'place-self' ||
  breakProps.indexOf(o.property) > -1

// Some properties need a certain value, so autoprefixer will prefix them.
const propertyValue = p => (/^grid-(column|row)-end/.test(p) ? 'span 3' : '')

const dashify = str =>
  str
    .replace(/([A-Z])/g, '-$1')
    .replace(/^ms-/, '-ms-')
    .toLowerCase()

function generateFixture() {
  const fixture = {}
  Object.keys(data)
    // Filters autoprefixer data to include only property prefix related entries.
    .filter(
      s =>
        /^[^:@].*$/.test(s) &&
        data[s].props === undefined &&
        notDescribedCanIUseProps.indexOf(data[s].feature) < 0
    )
    // Add data from caniuse-db.
    .map(s => ({
      property: s,
      feature: data[s].feature,
      ...getSupport(data[s].feature, currentBrowser)
    }))
    // Exclude unnecessary properties.
    .filter(o => !isExcluded(o))
    .forEach(o => {
      // Current properties.
      let properties = Object.keys(
        prefixer({
          [o.property]: propertyValue(o.property)
        })
      ).map(dashify)
      // Remove unprefixed prop (last in array) when prefix is needed.
      properties = properties.length > 1 ? properties.slice(0, properties.length - 1) : properties
      fixture[o.property] = properties.length === 1 ? properties[0] : properties
    })
  return fixture
}

export default generateFixture()
