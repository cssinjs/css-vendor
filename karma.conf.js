const webpackConfig = require('./webpack.config')
const browsers = require('./browsers')

const useCloud = process.env.USE_CLOUD === 'true'
const browserStackUserName = process.env.BROWSER_STACK_USERNAME
const browserStackAccessKey = process.env.BROWSER_STACK_ACCESS_KEY
const isTravis = process.env.TRAVIS
const travisBuildNumber = process.env.TRAVIS_BUILD_NUMBER
const travisBuildId = process.env.TRAVIS_BUILD_ID
const travisJobNumber = process.env.TRAVIS_JOB_NUMBER

module.exports = (config) => {
  config.set({
    customLaunchers: browsers,
    browsers: ['Opera'],
    frameworks: ['mocha'],
    files: [
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/es5-shim/es5-sham.js',
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map'
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha']
  })

  if (useCloud) {
    Object.assign(config, {
      browsers: Object.keys(browsers),
      // My current OS plan allows max 2 parallel connections.
      concurrency: 2,
      retryLimit: 3,

      // Timeouts taken from https://github.com/karma-runner/karma-browserstack-launcher/issues/61
      captureTimeout: 3e5,
      browserNoActivityTimeout: 3e5,
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3
    })

    config.browserStack = {
      username: browserStackUserName,
      accessKey: browserStackAccessKey,
      captureTimeout: 3e5
    }

    if (isTravis) {
      Object.assign(config.browserStack, {
        build: `TRAVIS #${travisBuildNumber} (${travisBuildId})`,
        name: travisJobNumber
      })
    }
  }
}
