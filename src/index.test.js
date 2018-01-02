import {currentBrowser} from 'caniuse-support'

const msg = `Detected browser: ${currentBrowser.id} ${currentBrowser.version}`
console.log(msg) // eslint-disable-line no-console
