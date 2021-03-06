#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');
const lib = require('./lib');
const core = require('./core');

/**
 * The exposed run function that client call.
 * @param parsedArgs
 */
function run(parsedArgs) {
  if (!parsedArgs) {
    return false;
  }

  core.run(lib.validateArgs(parsedArgs, [{
    option: 'webpack-config',
    validate: (val) => {
      if (val) {
        return fs.existsSync(val);
      }
      return true;
    },
    error: 'The specified webpack config does not exist.',
  }, {
    option: 'spec',
    validate: (val) => {
      if (val) {
        return glob.sync(val).length > 0;
      }
      return true;
    },
    error: 'No spec files were found.',
  }, {
    option: 'watch',
    validate: (val) => {
      if (!val) return true;

      if (val.length > 0) {
        return val.split(',').every((dir) => fs.existsSync(dir));
      }
      return true;
    },
    error: 'Please specify valid directories to watch.',
  }, {
    option: 'require',
    validate: (val) => {
      if (val) {
        return fs.existsSync(val);
      }
      return true;
    },
    error: 'The specified required file does not exist.',
  }]));
}

// If running via command line..
if (require.main === module) {
  run(lib.parseInput(lib.getArgs()));
}

// Programmatic API
module.exports = {
  run(conf) {
    const parsedInput = lib.parseInput(conf);
    run(parsedInput);
    return parsedInput;
  },
};
