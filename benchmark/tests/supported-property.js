import supportedProperty from '../../src/supported-property'

suite('Supported property', () => {
  benchmark('margin', () => supportedProperty('margin') === 'margin')

  benchmark('transition', () => supportedProperty('transition') === 'transition')

  benchmark('appearance', () => supportedProperty('appearance') === 'appearance')

  benchmark('flex-positive', () => supportedProperty('flex-positive') === 'flex-grow')
})
