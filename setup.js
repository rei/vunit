const { expect } = require('chai');

// setup JSDOM
process.stdout.write('Setting up JSDOM...');
require('jsdom-global')();

// See https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167
window.Date = Date;

global.ShadowRoot = window.ShadowRoot;

global.SVGElement = window.SVGElement;

process.stdout.write(window && window.document ? 'OK.\r\n' : 'Not OK.\r\n');

// make chai.expect available globally
global.expect = expect;
