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

describe('parseInput', () => {
  it('should exist', () => {
    assert(typeof lib.parseInput === 'function');
  });

  it('should return false if contains invalid option', () => {
    const options = {
      watch: 'js,test',
      blah1: 1,
      spec: '/path/to/spec'
    };

    assert.equal(lib.parseInput(options), null);
  });

  it('should return parsed options if valid input', () => {
    const options = {
      watch: 'js,test',
      spec: '/path/to/spec'
    };

    assert.deepEqual(lib.parseInput(options), {
      coverage: false,
      spec: '/path/to/spec',
      watch: 'js,test',
      'webpack-config': false,
      require: false,
    });
  });
});
