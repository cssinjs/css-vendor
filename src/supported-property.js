import isInBrowser from 'is-in-browser'
import prefix from './prefix'
import camelize from './camelize'
import { supportedPropertyPlugins } from "./plugins"

let el
const cache = {}

if (isInBrowser) {
  el = document.createElement('p')

  /**
   * We test every property on vendor prefix requirement.
   * Once tested, result is cached. It gives us up to 70% perf boost.
   * http://jsperf.com/element-style-object-access-vs-plain-object
   *
   * Prefill cache with known css properties to reduce amount of
   * properties we need to feature test at runtime.
   * http://davidwalsh.name/vendor-prefix
   */
  const computed = window.getComputedStyle(document.documentElement, '')
  for (const key in computed) {
    if (!isNaN(key)) cache[computed[key]] = computed[key]
  }
}

const propertyDetectors = [
  // Camelization is required because we can't test using
  // css syntax for e.g. in FF.
  // Test if property is supported as it is.
  (prop, style) => camelize(prop) in style ? prop : false,
  // Test if property is supported with vendor prefix.
  (prop, style) => prefix.js + camelize(`-${prop}`) in style ? prefix.css + prop : false,
  ...supportedPropertyPlugins
]

/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
export default function supportedProperty(prop) {
  // For server-side rendering.
  if (!el) return prop

  // We have not tested this prop yet, lets do the test.
  if (cache[prop] != null) return cache[prop]

  for (let i=0; i < propertyDetectors.length; i++) {
    cache[prop] = propertyDetectors[i](prop, el.style)
    if (cache[prop]) break
  }

  return cache[prop]
}
