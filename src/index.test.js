import {detectBrowser} from 'caniuse-support'

const currentBrowser = detectBrowser(window.navigator.userAgent)

const msg = `Detected browser: ${currentBrowser.id} ${currentBrowser.version}`
console.log(msg) // eslint-disable-line no-console
