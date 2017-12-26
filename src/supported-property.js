import isInBrowser from 'is-in-browser'
import {propertyDetectors, noPrefill} from './plugins'
import propertyPrefixFixture from '../tests/fixtures'

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
    if (!Number.isNaN(key)) cache[computed[key]] = computed[key]
  }

  // Properties that cannot be correctly detected using the
  // cache prefill method.
  noPrefill.forEach(x => delete cache[x])
}

function transitionTransformPrefix(options, prop) {
  if (propertyPrefixFixture[prop].split('-')[1]) {
    options[prop] = true
  }
}

/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @param {Object} [options]
 * @return {String|Boolean}
 * @api public
 */
export default function supportedProperty(prop, options = {}) {
  // For server-side rendering.
  if (!el) return prop

  if (cache[prop] != null && cache[prop] !== ('transform' || 'transition')) {
    return cache[prop]
  }

  const propValue = cache[prop] || prop

  if (propValue === 'transform' || propValue === 'transition') {
    transitionTransformPrefix(options, prop)
  }

  for (let i = 0; i < propertyDetectors.length; i++) {
    cache[prop] = propertyDetectors[i](prop, el.style, options)
    if (cache[prop]) break
  }

  return cache[prop]
}
