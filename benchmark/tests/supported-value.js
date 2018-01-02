import {supportedValue} from '../../src'

suite('Supported value', () => {
  benchmark('background-color', () => supportedValue('background-color', 'white') === 'white')

  benchmark('transition with double array value', () => (
    supportedValue(
      'transition',
      [['all', '100ms', 'ease'], ['transform', '200ms', 'linear']]
    ) === 'all 100ms ease, transform 200ms linear'
  ))

  benchmark('transition with string value', () => (
    supportedValue(
      'transition',
      'all 100ms ease, transform 200ms linear'
    ) === 'all 100ms ease, transform 200ms linear'
  ))
})
