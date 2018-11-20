const assert = require('assert');
const lib = require('../lib/');

describe('getArguments', () => {
  it('should exist', () => {
    assert(typeof lib.getArguments === 'function');
  });

  it('should process argv', () => {
    const argv = ['npx', 'vunit', '--b=2', '--a=1', '--c'];
    assert.deepEqual(lib.getArguments(argv), {
      a: '1',
      b: '2',
      c: true
    });
  });
});

describe('validateArguments', () => {
  it('should exist', () => {
    assert(typeof lib.validateArgs === 'function');
  });

  it('should validate args per validate function', () => {
    const args = {
      watch: 'js,test'
    };

    assert.ok(lib.validateArgs(args, [{
      option: 'watch',
      validate: (val) => {
        if (val) {
          return val.length > 0;
        }
        return true;
      },
      error: "Error message.",
    }]));
  });

  it('should error if validation fails', () => {
    const args = {
      watch: 'js,test'
    };

    assert.ok(!lib.validateArgs(args, [{
      option: 'watch',
      validate: () => false,
      error: "Error message here.",
    }]));
  });
});
