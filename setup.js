// setup JSDOM
process.stdout.write('Setting up JSDOM...');
require('jsdom-global')();

// https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167
window.Date = Date;

if (window && window.document) {
  process.stdout.write('OK.\r\n')
} else {
  process.stdout.write('Not OK.\r\n')
}

// make expect available globally
global.expect = require('expect');
